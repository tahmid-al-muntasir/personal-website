2:I[9851,["231","static/chunks/231-c63117a5b6b390d2.js","308","static/chunks/app/blog/%5Bslug%5D/page-3469a2c7bf8bf114.js"],"default"]
12:I[9275,[],""]
14:I[1343,[],""]
15:I[7840,["231","static/chunks/231-c63117a5b6b390d2.js","2","static/chunks/2-b18508ba591caf24.js","185","static/chunks/app/layout-1471eadb5ab7ec6b.js"],"default"]
16:I[1754,["231","static/chunks/231-c63117a5b6b390d2.js","2","static/chunks/2-b18508ba591caf24.js","185","static/chunks/app/layout-1471eadb5ab7ec6b.js"],"default"]
17:I[231,["231","static/chunks/231-c63117a5b6b390d2.js","931","static/chunks/app/page-9900f1939387e22a.js"],""]
3:T6b6,
## The Error

Running 1D thermal simulation. Everything looks fine. Temperature gradients look reasonable. Then I plot the PCM layer specifically and notice: the temperature front is moving through the phase-change region at the same speed as the rest of the textile. 

That's wrong. PCM is supposed to *slow down* the temperature front. That's the whole point.

## Root Cause

I was modeling PCM with a single heat capacity Cp. At phase change, PCM absorbs latent heat — meaning temperature stays ~constant while enthalpy changes. I wasn't tracking enthalpy at all.

The simulation was "working" in the sense that it ran without errors and produced numbers. The numbers were physically meaningless.

```python
# WRONG: treating PCM like any other material
def update_temp(T, k, rho, cp, dx, dt, q_in):
    return T + (dt / (rho * cp)) * (k * gradient(T) + q_in)

# RIGHT: track enthalpy, derive temperature from it
def get_temp_from_enthalpy(H, material):
    if H < material.H_melt_start:
        return material.T_melt_start + H / (material.rho * material.cp_solid)
    elif H > material.H_melt_end:
        return material.T_melt_end + (H - material.H_melt_end) / (material.rho * material.cp_liquid)
    else:
        # phase change region: temperature stays constant
        return material.T_melt  # isothermal!
```

## Lesson

**If your simulation runs without errors and gives plausible results, that's the most dangerous state.** Obvious errors are obvious. Subtle physics errors can live in your code for weeks.

Always validate against known analytical solutions before trusting numerical results. For PCM, the Stefan problem has an analytical solution — I should have checked against it on day 1.
    4:T653,
## The Problem

Standard pre-trained YOLO models are trained on COCO — a dataset of everyday objects. Fabric defects look nothing like that. Thin weave gaps, minor color bleeds, single broken threads: these are subtle, high-frequency patterns that a model pre-trained on dogs and cars has never seen.

Fine-tuning is the obvious answer. But the real challenge is data scarcity.

## Building the Dataset

I started labeling in Roboflow. Week 2 update: 47 images annotated across 4 defect classes — broken warp, broken weft, oil stain, and hole defect.

The labeling process itself was a lesson: defect boundaries are ambiguous. A broken warp thread looks different depending on lighting angle. I started defining a consistent labeling convention early, otherwise the annotations become noise.

```python
# Roboflow project setup
from roboflow import Roboflow
rf = Roboflow(api_key="YOUR_KEY")
project = rf.workspace().project("fabric-defects-v1")
dataset = project.version(1).download("yolov8")
```

## Augmentation Strategy

For a small dataset, augmentation is critical. I'm using:
- **Mosaic augmentation** — YOLOv8 default, good for small objects
- **Horizontal/vertical flip** — fabric has no canonical orientation
- **HSV jitter** — critical for handling lighting variation on factory floors
- **Gaussian blur** — simulating camera shake / out-of-focus shots

## Current Results

Baseline YOLOv8n fine-tuned on 47 images: mAP@50 = 0.31. Terrible, but expected for this dataset size. Target at 500 images: mAP@50 > 0.75.

Next step: get to 500 labeled images, then run the first real training run.
    5:T82f,
## The Seduction of Pure RL

When I first designed the control system for the smart textile project, the obvious move was: throw PPO at it. RL handles nonlinear dynamics, it can optimize long-horizon rewards, and it's the fashionable choice.

Then I thought about what failure looks like.

## What Failure Looks Like in a Wearable

The system is regulating **body temperature**. A failure isn't a bad evaluation score — it's someone's core temperature spiking or dropping. In a safety-critical context, an RL agent that occasionally explores a catastrophically bad action is not acceptable.

Pure RL has no concept of constraints. You can add penalty terms to the reward, but you cannot *guarantee* that the learned policy respects hard limits on actuator outputs or physiological parameters.

## The MPC Solution

Model Predictive Control solves this differently. You define:
- A physics model of the system (the thermal dynamics)
- Hard constraints on states and inputs
- A prediction horizon (I'm using T=30 minutes)

At every timestep, MPC solves an optimization problem subject to those constraints. **It mathematically cannot violate them.**

```python
# Simplified MPC setup with scipy
from scipy.optimize import minimize
import numpy as np

def mpc_step(state, model, N=30, constraints=None):
    def cost(u_sequence):
        states = simulate_forward(state, u_sequence, model)
        return thermal_comfort_loss(states) + control_effort(u_sequence)
    
    result = minimize(cost, x0=np.zeros(N), constraints=constraints)
    return result.x[0]  # Apply first action only
```

## The Hybrid Case

Pure MPC has a problem too: it requires an accurate model. Our thermal model is approximate — PCM dynamics are nonlinear and hysteresis-laden.

The hybrid approach: **RL learns the residual**. MPC handles safety and long-horizon planning; RL adapts to model mismatch in real time. This is the architecture I'm building.

The key insight: use MPC as a *constraint layer* for RL. The RL policy proposes actions, MPC clips them to the safe set. Neither system is fully in charge.
    6:T628,
## What I Built

A 1D finite-difference simulation of heat transfer through a 5-layer textile stack:
1. Outer shell (polyester)
2. Insulation layer
3. PCM (Phase Change Material) layer
4. Inner moisture-wicking layer  
5. Skin boundary condition

Simple Fourier conduction: q = -k · dT/dx

```python
import numpy as np
import matplotlib.pyplot as plt

def simulate_thermal_1d(T_skin=37.0, T_env=25.0, dt=0.1, n_steps=600):
    # Layer properties [thickness_m, k_W/mK, rho_kg/m3, cp_J/kgK]
    layers = [
        (0.002, 0.04, 1380, 1200),  # outer polyester
        (0.005, 0.03, 100,  1000),  # insulation
        (0.003, 0.20, 880,  2000),  # PCM (simplified, no latent heat yet)
        (0.002, 0.06, 1150, 1400),  # inner layer
    ]
    # ... finite difference update ...
```

## What Went Wrong

**The PCM layer blew up.** I forgot to handle latent heat. When the PCM hits its melting point (~28°C), it absorbs heat without changing temperature — that requires a separate enthalpy tracking variable, not just Cp.

This is exactly the kind of thing that doesn't show up in textbook problems. The simulation was running and producing numbers and the numbers looked plausible. It took me plotting the phase-change region to notice the temperature was advancing through the PCM too quickly.

## Fix

Added enthalpy tracking with a Stefan condition at the phase boundary. Now the PCM correctly "absorbs" heat for ~40 simulation seconds before the temperature front advances.

**Next**: extend to 2D, add the TEG power harvesting model, couple to the comfort metric.
    7:T4c5,
## The Baseline Task

Given a query in English: "thermal conductivity of polyester fiber", retrieve the most relevant document from a small test corpus that includes German, Japanese, and Arabic documents.

Metric: cosine similarity between query embedding and document embeddings.

## Models Tested

- **LaBSE** (Language-Agnostic BERT Sentence Embeddings)
- **multilingual-e5-base**
- **paraphrase-multilingual-mpnet-base-v2** (baseline)

```python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('sentence-transformers/LaBSE')
query = "thermal conductivity of polyester fiber"
query_emb = model.encode([query])

docs_de = ["Wärmeleitfähigkeit von Polyesterfasern beträgt etwa 0.04 W/mK"]
doc_embs = model.encode(docs_de)

similarity = np.dot(query_emb, doc_embs.T)[0][0]
# LaBSE result: 0.71 — pretty strong cross-lingual signal
```

## Results (mini-corpus, n=20)

| Model | EN-DE | EN-JA | EN-AR |
|---|---|---|---|
| LaBSE | 0.71 | 0.63 | 0.68 |
| mE5-base | 0.74 | 0.67 | 0.65 |
| mpnet | 0.58 | 0.44 | 0.51 |

mE5 edges out LaBSE on German and Japanese. Arabic is roughly tied.

**Next**: build the actual FAISS vector store, test on larger corpus.
    8:T701,
## The Problem

The materials science literature is polyglot. Significant work on smart textiles, PCM composites, and fiber-based sensors has been published in German (DIN standards), Japanese (Toray, Teijin research), Chinese, and Arabic. The majority of researchers working in English have no systematic access to this literature.

This is not a translation problem. Translation is lossy, slow, and creates a secondary document that drifts from the original. What we need is **direct cross-lingual retrieval** — query in English, retrieve in any language.

## Why This Is Hard for Domain-Specific Text

General multilingual embeddings are trained on web crawls and Wikipedia. Materials science text has a different register: dense technical terminology, units, compound nouns (especially in German). The question is whether off-the-shelf embeddings transfer to this domain.

Early results suggest: partially. LaBSE handles standard technical vocabulary well. It struggles with domain-specific compounds (German: *Wärmeleitfähigkeitsmessverfahren* — thermal conductivity measurement method).

## Architecture

```
Query (any language)
  → sentence embedding (LaBSE / mE5)
  → FAISS index search
  → top-k document chunks (any language)
  → LLM synthesis (English output)
```

The LLM synthesis step is important: the retrieved chunks may be in 3 different languages. The LLM needs to read all of them and synthesize a coherent answer.

## Open Questions

1. Do we need domain-adaptive fine-tuning for materials science embeddings?
2. What's the right chunking strategy for technical papers (abstract vs. section vs. paragraph)?
3. How do we evaluate when ground truth cross-lingual relevance judgments don't exist?

These are the core problems Pillar 3 is trying to solve.
    9:T657,
## The Problem with Ad-Hoc Research Code

Early in my projects I was doing what most solo researchers do: Jupyter notebooks, manual data downloads, hardcoded paths, no versioning. This works until it catastrophically doesn't — usually at the worst possible time (before a deadline, or when trying to reproduce results from 3 months ago).

## The Pipeline Structure I Use Now

```
project/
  data/
    raw/           ← immutable, never edited
    processed/     ← generated by scripts, can be regenerated
    external/      ← third-party datasets
  src/
    data/          ← data loading and preprocessing
    models/        ← model definitions
    training/      ← training scripts
    evaluation/    ← evaluation and metrics
  scripts/         ← one-off analysis scripts
  notebooks/       ← exploration only, never production
  configs/         ← YAML configs, not hardcoded hyperparams
  outputs/         ← model checkpoints, results
```

Key rule: **notebooks are for exploration only**. No notebook code ever runs in production. Everything that matters gets refactored into `src/`.

## Reproducibility

- All random seeds set and logged
- Config files (YAML via Hydra) instead of argparse or hardcoded values
- Weights & Biases for experiment tracking
- DVC for data versioning (in progress)

```python
import hydra
from omegaconf import DictConfig

@hydra.main(config_path="configs", config_name="train")
def train(cfg: DictConfig):
    set_seed(cfg.seed)
    model = build_model(cfg.model)
    # ...
```

This setup takes a day to set up properly. It saves weeks over a 6-month project.
    b:["Error","Simulation","Thermal Modeling","Debugging"]
c:T6b6,
## The Error

Running 1D thermal simulation. Everything looks fine. Temperature gradients look reasonable. Then I plot the PCM layer specifically and notice: the temperature front is moving through the phase-change region at the same speed as the rest of the textile. 

That's wrong. PCM is supposed to *slow down* the temperature front. That's the whole point.

## Root Cause

I was modeling PCM with a single heat capacity Cp. At phase change, PCM absorbs latent heat — meaning temperature stays ~constant while enthalpy changes. I wasn't tracking enthalpy at all.

The simulation was "working" in the sense that it ran without errors and produced numbers. The numbers were physically meaningless.

```python
# WRONG: treating PCM like any other material
def update_temp(T, k, rho, cp, dx, dt, q_in):
    return T + (dt / (rho * cp)) * (k * gradient(T) + q_in)

# RIGHT: track enthalpy, derive temperature from it
def get_temp_from_enthalpy(H, material):
    if H < material.H_melt_start:
        return material.T_melt_start + H / (material.rho * material.cp_solid)
    elif H > material.H_melt_end:
        return material.T_melt_end + (H - material.H_melt_end) / (material.rho * material.cp_liquid)
    else:
        # phase change region: temperature stays constant
        return material.T_melt  # isothermal!
```

## Lesson

**If your simulation runs without errors and gives plausible results, that's the most dangerous state.** Obvious errors are obvious. Subtle physics errors can live in your code for weeks.

Always validate against known analytical solutions before trusting numerical results. For PCM, the Stefan problem has an analytical solution — I should have checked against it on day 1.
    a:{"slug":"error-pcm-latent-heat","title":"ERROR LOG: PCM Phase Change Blowing Up My Simulation","date":"2026-04-21","category":"devlog","pillar":"P1","tags":"$b","readTime":"4 min","excerpt":"Spent 3 hours debugging a thermal sim that was giving plausible-but-wrong results. The fix was embarrassingly simple.","content":"$c"}
d:T632,
## The Plan

14-month B1 track. Resources: Nicos Weg (ZDF Mediathek), Anki Core 2000 German deck, Grammatik Aktiv B1, 30 min/day minimum.

Motivation: I want to read German materials science literature without going through machine translation. There's a reason DIN standards are written in German.

## Month 1: What Worked

**Nicos Weg** — better than expected. It's a free ZDF drama series made specifically for German learners. A1 through B1 content, with exercises. The production quality is decent, the listening practice is real speech (not robotically enunciated textbook German).

**Anki** — I'm doing 20 new cards/day, which means I'll complete the Core 2000 in about 100 days. The spaced repetition is doing what it's supposed to. No complaints.

**Shadowing** — I started doing 10 minutes of shadowing after each Nicos Weg episode. Uncomfortable. Probably necessary.

## Month 1: What Didn't Work

**Grammatik drills alone**. I can conjugate haben/sein in all tenses on paper. In a listening context I still miss the grammar because I'm processing vocabulary. Reading first, grammar second seems like the right order for me.

**Translation-first mindset**. I kept trying to translate German sentences into English in my head. Started forcing myself to associate German words with images/concepts instead. Early days, but it feels less exhausting.

## Numbers

- Anki: 387 words learned (retention 89%)
- Nicos Weg: Episodes 1–12 complete
- Shadowing: 8 sessions

Target for Month 2: 600 words, Episodes 1–24, first attempt at reading a simple German abstract.
    e:T42c,
## Hiragana: Done

All 46 hiragana characters memorized in 6 days. Method: Anki with the Remembering the Kana deck, plus writing by hand 3x each.

Writing by hand is optional for recognition, but it dramatically accelerates memorization. Something about the motor memory encoding helps. I now associate each character with the physical motion of writing it.

## Observations on Learning a Non-Latin Script

Arabic script (which I've been studying separately for Quranic reading) was harder to start. Right-to-left, letters change shape based on position, no vowel markings. Hiragana by comparison is forgiving: each character is unique, no positional variation, no ambiguity.

The interesting thing: once you break the "I need to read phonetically in Latin characters" dependence, your reading speed jumps immediately. I'm now reading hiragana at a reasonable pace after 1 week. I couldn't do that with romaji after 2 weeks.

## Next

Katakana (similar timeline, ~1 week). Then JLPT N5 vocabulary (~800 words). Then grammar (Genki I).

Target: N4 by end of year.
    f:T7ca,
## The Formula vs. The Idea

Most RL courses introduce the Bellman equation like this:

$$V(s) = \max_a \left[ R(s, a) + \gamma \cdot V(s') \right]$$

This is correct. It's also completely opaque if you're encountering it for the first time.

Here's the idea: **the value of a state is a promise**. It's a promise that says: "if you act optimally from here, I'll tell you how much reward you can expect over your entire future."

## Why Recursion Makes Sense

The recursive structure isn't mathematical cleverness — it's the only structure that makes sense. The value of state *s* depends on the value of the next state *s'*, which depends on the state after that, and so on. You can't compute V(s) without knowing V(s'). You can't know V(s') without knowing V(s''), etc.

The Bellman equation is a *self-consistency condition*. It says: any valid value function must satisfy this equation simultaneously at every state. The optimal value function is the unique fixed point of this operator.

## The Dynamic Programming Connection

This is exactly dynamic programming. In classic DP:
- You break a problem into subproblems
- You solve subproblems once and store results
- Larger problems use stored subproblem solutions

Value iteration is literally this: start with an arbitrary V, repeatedly apply the Bellman operator, watch it converge to the true V*.

## Why I Think About This While Building the Smart Textile Controller

The RL agent for thermal regulation has a 30-minute horizon. Every "state" is a temperature profile + time + TEG power level. The Bellman equation says: the value of being at a comfortable 37°C isn't just comfort right now — it's that plus the expected future comfort under optimal control.

This is why the horizon matters. Too short: the agent ignores consequences. Too long: the discount factor makes future rewards irrelevant. Getting γ right is not a mathematical choice — it's a statement about how much the system should "care" about the future.
    10:T898,
## The Naive View

Train a robot in simulation. Deploy in the real world. What could go wrong?

Everything. The floor has different friction. The camera has different noise characteristics. The motor has backlash the simulator didn't model. The lighting is different. The time delay is different.

This is called the **reality gap**, and it's not a calibration problem — it's a *distribution shift* problem.

## Why It's Different from Standard OOD

In standard out-of-distribution generalization, you have a training distribution and a test distribution. The test distribution is unknown but fixed. You try to learn representations that transfer.

In sim-to-real, the *structure* of the distributions is different, not just the parameters. Simulation is a model of reality. Models are always wrong. The question is which wrongness kills you.

A policy trained in simulation learns to exploit simulator artifacts — the perfectly smooth floor, the instantaneous actuation, the Gaussian noise model. These aren't features of the real world. They're features of the simulator. The policy is overfitting to the wrong things.

## Domain Randomization as a Solution

Domain randomization says: make the simulator *deliberately wrong* in many ways. Randomize:
- Floor friction (uniform 0.3–0.9)
- Mass of objects (±20%)
- Camera noise model
- Actuator delay

If the policy learns to work across all these variations, it might generalize to the *specific* way reality differs from simulation.

This is Pillar 2 for me. The fabric defect detector needs to work under real factory lighting, with real camera shake, with actual gripper vibration. Sim-to-real isn't optional.

## The Part That Fascinates Me

Domain randomization is essentially learning a policy that's robust to a specified *uncertainty set*. This connects directly to robust control theory — the same mathematical ideas I'm using in Pillar 1 for the MPC controller.

The same principle — design for a distribution of environments, not a single point — appears across RL, control theory, and robust statistics. That's not a coincidence. It's a deep structural property of any system that has to operate in an uncertain world.
    11:T4c2,
People ask why a textile engineer is doing RL research.

The honest answer: because textiles are the most underestimated material system in existence. A woven structure is a 2D network of fibers with tunable mechanical, thermal, and electrical properties. It's lightweight, conformable, manufacturable at scale, and sits directly against the human body. And the industry that makes it is essentially running on 1970s automation.

The AI revolution hasn't touched textiles yet. Not really. There are some computer vision systems for defect detection. There are some scheduling optimizations. But the intelligent, self-regulating, energy-autonomous smart material? That doesn't exist yet.

That's not a niche. That's an entire field waiting to be built.

When I started researching PCM thermal regulation, I needed control theory. When I started modeling the control system, I needed RL. When I needed to synthesize research across 8 languages, I needed NLP. The textile problem *generated* the AI problems.

I think the best interdisciplinary researchers don't pick a domain because it's fashionable. They follow a specific physical problem until it forces them into every discipline it touches.

That's the plan.
    13:["slug","error-pcm-latent-heat","d"]
0:["_qX74l9M2noiAwyUF8cMN",[[["",{"children":["blog",{"children":[["slug","error-pcm-latent-heat","d"],{"children":["__PAGE__?{\"slug\":\"error-pcm-latent-heat\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["blog",{"children":[["slug","error-pcm-latent-heat","d"],{"children":["__PAGE__",{},[["$L1",["$","$L2",null,{"post":{"slug":"error-pcm-latent-heat","title":"ERROR LOG: PCM Phase Change Blowing Up My Simulation","date":"2026-04-21","category":"devlog","pillar":"P1","tags":["Error","Simulation","Thermal Modeling","Debugging"],"readTime":"4 min","excerpt":"Spent 3 hours debugging a thermal sim that was giving plausible-but-wrong results. The fix was embarrassingly simple.","content":"$3"},"allPosts":[{"slug":"yolov8-fabric-defects","title":"Fine-tuning YOLOv8 for Fabric Defect Detection","date":"2026-04-15","category":"research","pillar":"P2","tags":["YOLOv8","Computer Vision","Manufacturing"],"readTime":"8 min","excerpt":"A deep dive into training YOLOv8 on custom fabric defect datasets, including data augmentation strategies and hyperparameter optimization.","content":"$4"},{"slug":"why-pure-rl-fails-wearables","title":"Why Pure RL Fails for Safety-Critical Wearables (And Why We Need MPC)","date":"2026-03-28","category":"research","pillar":"P1","tags":["Reinforcement Learning","Control Theory","Wearables","MPC"],"readTime":"12 min","excerpt":"Exploring the limitations of pure reinforcement learning in safety-critical applications and the case for hybrid RL+MPC controllers.","content":"$5"},{"slug":"thermal-simulation-fourier-baseline","title":"Week 1: First Thermal Simulation Results (Fourier's Law Baseline)","date":"2026-04-22","category":"devlog","pillar":"P1","tags":["Thermal Modeling","Simulation","Python"],"readTime":"3 min","excerpt":"Initial 1D thermal simulation using Fourier's law. Results, surprises, and what I got wrong on the first try.","content":"$6"},{"slug":"yolov8-dataset-labeling-week2","title":"Week 2: YOLOv8 Dataset Labeling — 47 Images Done","date":"2026-04-20","category":"devlog","pillar":"P2","tags":["YOLOv8","Dataset","Roboflow"],"readTime":"2 min","excerpt":"Progress update on fabric defect dataset creation. Lessons from the first 47 annotations.","content":"\n## Current Status\n\n47 / 500 target images annotated. Classes: broken_warp, broken_weft, oil_stain, hole.\n\n## What's Taking Time\n\nHonestly? Deciding where a defect *ends*. Broken warp threads extend along the full warp length in theory, but the visible damage might be localized. I've been labeling the visually distinct damage region only, not the full thread path.\n\nThis will need to be consistent across all 500 images. I made a labeling guide for myself after image 20 when I realized my early boxes were inconsistently sized.\n\n## Roboflow Workflow\n\nUsing Roboflow's web annotator. It's decent. The smart polygon tool doesn't work well for thin linear defects — bounding boxes only for now.\n\nAuto-augmentation preview in Roboflow: the HSV jitter settings look good. I'll keep mosaic on.\n\n**Target**: 500 images by end of May. Then first real training run.\n    "},{"slug":"cosine-similarity-multilingual-embeddings","title":"Week 2: Cosine Similarity Baselines for Multilingual Embeddings","date":"2026-04-18","category":"devlog","pillar":"P3","tags":["NLP","Embeddings","RAG"],"readTime":"3 min","excerpt":"Benchmarking LaBSE and multilingual-E5 on cross-lingual similarity tasks for materials science queries.","content":"$7"},{"slug":"cross-lingual-embeddings-materials-science","title":"Cross-Lingual Embeddings for Materials Science Literature","date":"2026-03-10","category":"research","pillar":"P3","tags":["NLP","Embeddings","RAG","Materials Science"],"readTime":"10 min","excerpt":"Evaluating multilingual sentence embeddings for cross-lingual retrieval in materials science research.","content":"$8"},{"slug":"building-robust-data-pipelines","title":"Building Robust Data Pipelines for Research","date":"2026-02-20","category":"research","pillar":null,"tags":["Infrastructure","Python","Automation"],"readTime":"6 min","excerpt":"How I structured my research data pipelines to avoid the painful mistakes most solo researchers make.","content":"$9"},"$a",{"slug":"error-faiss-index-mismatch","title":"ERROR LOG: FAISS Index Dimension Mismatch at 2am","date":"2026-04-16","category":"devlog","pillar":"P3","tags":["Error","FAISS","NLP","Debugging"],"readTime":"2 min","excerpt":"Classic mistake. FAISS index built with LaBSE, queried with mE5. Dimension mismatch. 45 minutes lost.","content":"\n## The Error Message\n\n```\nfaiss.swigfaiss.FaissException: Error in faiss::IndexFlat::search\nd=768 != d_index=1024\n```\n\n## What Happened\n\nBuilt the FAISS index with LaBSE embeddings (768-dim). Later in the notebook, switched to multilingual-e5-large (1024-dim) for a comparison. Forgot to rebuild the index. 45 minutes of confused debugging at 2am.\n\n## The Fix\n\n```python\n# Always save model name with the index\nimport pickle\n\nindex_metadata = {\n    \"model_name\": \"sentence-transformers/LaBSE\",\n    \"dimension\": 768,\n    \"n_docs\": len(corpus),\n    \"created\": datetime.now().isoformat()\n}\n\nwith open(\"index_metadata.pkl\", \"wb\") as f:\n    pickle.dump(index_metadata, f)\n\n# On load, assert dimensions match\nassert loaded_model.get_sentence_embedding_dimension() == index_metadata[\"dimension\"]\n```\n\n## Lesson\n\nName your artifacts. Every saved model file, index, and checkpoint should encode the model name and key hyperparameters. Future you at 2am will thank you.\n    "},{"slug":"german-month-1-review","title":"German Month 1 Review: What's Working, What Isn't","date":"2026-04-28","category":"language","tags":["German","Language Learning","Anki"],"readTime":"5 min","excerpt":"One month into B1 German. Honest assessment of my study methods and the surprises so far.","content":"$d"},{"slug":"japanese-hiragana-done","title":"Japanese: Hiragana Complete — Notes from the First Week","date":"2026-04-10","category":"language","tags":["Japanese","Language Learning","Hiragana"],"readTime":"3 min","excerpt":"Finished the hiragana table. Moving to katakana and JLPT N5 vocab. Some observations on learning a non-Latin script.","content":"$e"},{"slug":"bellman-equation-intuition","title":"The Bellman Equation is Just a Promise About the Future","date":"2026-04-05","category":"math","tags":["Reinforcement Learning","Math","Intuition"],"readTime":"6 min","excerpt":"Everyone learns the Bellman equation as a formula. Here's how I finally understood it as an idea.","content":"$f"},{"slug":"why-sim-to-real-is-hard","title":"Why Sim-to-Real Transfer is Genuinely Hard (and Kind of Fascinating)","date":"2026-03-20","category":"math","tags":["Reinforcement Learning","Robotics","Sim-to-Real","Domain Randomization"],"readTime":"7 min","excerpt":"The gap between simulation and reality is a distribution shift problem. Here's what makes it fundamentally different from standard out-of-distribution generalization.","content":"$10"},{"slug":"on-being-a-textile-engineer-doing-ai","title":"On Being a Textile Engineer Doing AI Research","date":"2026-04-25","category":"note","tags":["Reflection","PhD","Career"],"readTime":"3 min","excerpt":"People ask why a textile engineer is doing reinforcement learning research. Here's the actual answer.","content":"$11"}]}]],null],null]},["$","$L12",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children","$13","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L14",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","styles":null}],null]},["$","$L12",null,{"parallelRouterKey":"children","segmentPath":["children","blog","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L14",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","styles":null}],null]},[["$","html",null,{"lang":"en","children":[["$","head",null,{"children":[["$","meta",null,{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","link",null,{"rel":"canonical","href":"https://tahmids-website.vercel.app"}],["$","script",null,{"type":"application/ld+json","dangerouslySetInnerHTML":{"__html":"{\"@context\":\"https://schema.org\",\"@type\":\"Person\",\"name\":\"Tahmid Al Muntasir\",\"url\":\"https://tahmids-website.vercel.app\",\"sameAs\":[\"https://github.com/tahmid-al-muntasir\",\"https://linkedin.com/in/tahmid-al-muntasir\"],\"jobTitle\":\"Final-Year Student | AI/ML Engineer\",\"description\":\"Building rigorous AI systems at the intersection of textile engineering, machine learning, computer vision, and robotics.\",\"knowsAbout\":[\"Machine Learning\",\"Computer Vision\",\"Robotics\",\"Textile Engineering\",\"Reinforcement Learning\"]}"}}]]}],["$","body",null,{"children":[["$","$L15",null,{}],["$","a",null,{"href":"#main-content","className":"skip-link","children":"Skip to main content"}],["$","div",null,{"className":"site-wrap","children":["$","div",null,{"className":"layout-main","children":[["$","$L16",null,{}],["$","main",null,{"id":"main-content","className":"content-main page-shell","children":["$","$L12",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L14",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":["$","div",null,{"className":"card not-found","data-reveal":true,"children":[["$","div",null,{"className":"not-found-code","children":"404"}],["$","h2",null,{"children":"Page not found"}],["$","p",null,{"className":"card-copy","children":"This page doesn't exist, or it has not been built yet."}],["$","$L17",null,{"href":"/","className":"button button-secondary","children":"Back to home"}]]}],"notFoundStyles":[],"styles":null}]}],["$","footer",null,{"className":"site-footer","role":"contentinfo","children":["$","div",null,{"className":"footer-content","children":["$","p",null,{"className":"label","children":"© 2026 Tahmid Al Muntasir. Built with Next.js, CSS, and rigor."}]}]}]]}]}]]}]]}],null],null],[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/45b8e918485caebc.css","precedence":"next","crossOrigin":"$undefined"}]],"$L18"]]]]
18:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"ERROR LOG: PCM Phase Change Blowing Up My Simulation | TAM"}],["$","meta","3",{"name":"description","content":"Spent 3 hours debugging a thermal sim that was giving plausible-but-wrong results. The fix was embarrassingly simple."}],["$","meta","4",{"property":"og:title","content":"Tahmid Al Muntasir | Textile Engineering × AI"}],["$","meta","5",{"property":"og:description","content":"Final-year engineering student building systems at the intersection of textile engineering, machine learning, and robotics."}],["$","meta","6",{"property":"og:url","content":"https://tahmids-website.vercel.app/"}],["$","meta","7",{"property":"og:type","content":"website"}],["$","meta","8",{"name":"twitter:card","content":"summary"}],["$","meta","9",{"name":"twitter:title","content":"Tahmid Al Muntasir | Textile Engineering × AI"}],["$","meta","10",{"name":"twitter:description","content":"Final-year engineering student building systems at the intersection of textile engineering, machine learning, and robotics."}]]
1:null
