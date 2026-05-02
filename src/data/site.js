export const siteConfig = {
  name: "Tahmid Al Muntasir",
  initials: "TAM",
  tagline: "Textile Engineering × AI",
  subtitle: "Machine Learning · Computer Vision · Robotics",
  description: "Final-year engineering student building rigorous, deployment-minded systems at the intersection of textile engineering, machine learning, computer vision, and robotics.",
  location: "Bangladesh 🇧🇩",
  email: "tahmid@example.com",
  links: {
    github: "https://github.com/tahmid-al-muntasir",
    linkedin: "https://linkedin.com/in/tahmid-al-muntasir",
    kaggle: "https://www.kaggle.com/tahmidalmuntasir",
    leetcode: "https://leetcode.com/tahmidalmuntasir",
    twitter: "",
    cv: "/cv.pdf",
  },
  forms: {
    formspreeId: '',
  },
  status: "Open to PhD Opportunities · 2026",
  quote: '"The best research solves real problems." — TAM',
};

export const researchPillars = [
  {
    id: "p1",
    num: "01",
    label: "Pillar 1",
    title: "AI-Driven Smart Thermal Garments",
    shortTitle: "Smart Thermal Garments",
    phase: "Active — Thesis Track",
    color: "rust",
    summary: "Bio-based PCM thermal regulation with hybrid control, edge deployment, and comfort-aware sensing.",
    description: "Designing a thermal garment that fuses body sensing, physics-based modeling, and hybrid control. The system explores bio-based PCM layers, predictive thermal regulation, and ESP32-class deployment for a battery-light wearable platform.",
    problems: ["2D thermal modeling", "PCM phase-change behavior", "MPC baseline", "TinyML deployment", "Comfort-aware control"],
    stack: ["ESP32", "PCM", "PyTorch", "SciPy", "MPC"],
    target: "IEEE Transactions on Industrial Electronics",
    paperTitle: "Hybrid Control for AI-Driven Smart Thermal Garments with Bio-Based PCM",
  },
  {
    id: "p2",
    num: "02",
    label: "Pillar 2",
    title: "Real-Time CV for Fabric Defect Detection",
    shortTitle: "Fabric Defect Detection",
    phase: "Active — Applied Vision",
    color: "amber",
    summary: "Production-ready defect detection for textile quality control using computer vision.",
    description: "Building a real-time computer vision pipeline for textile inspection with YOLOv8. Focus: robust detection under changing factory lighting, fast inference, and practical QA workflows.",
    problems: ["Fabric defect dataset creation", "YOLOv8 training", "Runtime optimization", "Lighting robustness", "Deployment workflow"],
    stack: ["YOLOv8", "PyTorch", "OpenCV", "Roboflow", "ESP32"],
    target: "CVPR Workshop on Vision for Manufacturing",
    paperTitle: "Real-Time Fabric Defect Detection for Textile Quality Assurance",
  },
  {
    id: "p3",
    num: "03",
    label: "Pillar 3",
    title: "RL for Robotic Fabric Manipulation",
    shortTitle: "Robotic Fabric Manipulation",
    phase: "Active — Robotics Track",
    color: "sage",
    summary: "Simulation-first reinforcement learning for textile handling and robot policy learning.",
    description: "Exploring reinforcement learning policies for robotic fabric manipulation, with an emphasis on simulation environments, motion planning, and policy transfer from Gazebo to real-world systems.",
    problems: ["Policy learning", "ROS integration", "Gazebo simulation", "Grasp stability", "Sim-to-real transfer"],
    stack: ["ROS", "Gazebo", "PyTorch", "RL", "Computer Vision"],
    target: "ACL Findings",
    paperTitle: "Reinforcement Learning for Robotic Fabric Manipulation in Simulation",
  },
];

export const projects = [
  {
    id: "etextile-control",
    pillar: "P1",
    pillarColor: "rust",
    phase: "Thesis Track",
    title: "AI-Driven Smart Thermal Garments",
    description: "A wearable control stack that combines bio-based PCM, thermal sensing, and hybrid predictive control for adaptive comfort regulation.",
    status: "active",
    github: "https://github.com/tahmid-al-muntasir/etextile-control",
    demo: "",
    stack: ["PCM", "ESP32", "PyTorch", "SciPy", "MPC"],
    highlights: ["Bio-based PCM thesis in progress", "Thermal model refined", "Edge deployment path defined"],
  },
  {
    id: "fabric-vision",
    pillar: "P2",
    pillarColor: "amber",
    phase: "Applied Vision",
    title: "Real-Time CV for Fabric Defect Detection",
    description: "A fast inspection pipeline for textile defects using YOLO-based detection and production-minded inference workflows.",
    status: "active",
    github: "https://github.com/tahmid-al-muntasir/fabric-vision",
    demo: "",
    stack: ["YOLO", "PyTorch", "OpenCV", "Roboflow", "ESP32"],
    highlights: ["Dataset labeling underway", "Real-time inference target", "Factory deployment constraints mapped"],
  },
  {
    id: "robotic-fabric-manipulation",
    pillar: "P3",
    pillarColor: "sage",
    phase: "Robotics Track",
    title: "RL for Robotic Fabric Manipulation",
    description: "Simulation-first reinforcement learning for robot policies that can pick, align, and manipulate textile materials reliably.",
    status: "active",
    github: "https://github.com/tahmid-al-muntasir/robotic-fabric-manipulation",
    demo: "",
    stack: ["ROS", "Gazebo", "PyTorch", "RL", "Computer Vision"],
    highlights: ["Simulation environment in progress", "Policy design underway", "Sim-to-real path planned"],
  },
];

export const experience = [
  {
    period: "2025–Present",
    title: "Bio-based PCM thesis",
    org: "Final-year research",
    status: "In progress",
    summary: "Designing and validating the thermal regulation system, from simulation and control baselines to a deployable smart-garment prototype.",
  },
  {
    period: "Industrial rotation II",
    title: "Textile manufacturing rotation",
    org: "SQUARE Apparels",
    status: "Completed",
    summary: "Process observation, production-floor analysis, and the link between textile manufacturing constraints and automation opportunities.",
  },
  {
    period: "Industrial rotation I",
    title: "Textile operations rotation",
    org: "SQUARE Apparels",
    status: "Completed",
    summary: "Hands-on exposure to production systems, quality-control workflows, and the operational realities that shape textile-engineering decisions.",
  },
];

// ── BLOG POSTS ──────────────────────────────────────────────────────────────
// Categories: "research" | "devlog" | "language" | "math" | "note" | "linkedin"
export const posts = [
  {
    slug: "yolov8-fabric-defects",
    title: "Fine-tuning YOLOv8 for Fabric Defect Detection",
    date: "2026-04-15",
    category: "research",
    pillar: "P2",
    tags: ["YOLOv8", "Computer Vision", "Manufacturing"],
    readTime: "8 min",
    excerpt: "A deep dive into training YOLOv8 on custom fabric defect datasets, including data augmentation strategies and hyperparameter optimization.",
    content: `
## The Problem

Standard pre-trained YOLO models are trained on COCO — a dataset of everyday objects. Fabric defects look nothing like that. Thin weave gaps, minor color bleeds, single broken threads: these are subtle, high-frequency patterns that a model pre-trained on dogs and cars has never seen.

Fine-tuning is the obvious answer. But the real challenge is data scarcity.

## Building the Dataset

I started labeling in Roboflow. Week 2 update: 47 images annotated across 4 defect classes — broken warp, broken weft, oil stain, and hole defect.

The labeling process itself was a lesson: defect boundaries are ambiguous. A broken warp thread looks different depending on lighting angle. I started defining a consistent labeling convention early, otherwise the annotations become noise.

\`\`\`python
# Roboflow project setup
from roboflow import Roboflow
rf = Roboflow(api_key="YOUR_KEY")
project = rf.workspace().project("fabric-defects-v1")
dataset = project.version(1).download("yolov8")
\`\`\`

## Augmentation Strategy

For a small dataset, augmentation is critical. I'm using:
- **Mosaic augmentation** — YOLOv8 default, good for small objects
- **Horizontal/vertical flip** — fabric has no canonical orientation
- **HSV jitter** — critical for handling lighting variation on factory floors
- **Gaussian blur** — simulating camera shake / out-of-focus shots

## Current Results

Baseline YOLOv8n fine-tuned on 47 images: mAP@50 = 0.31. Terrible, but expected for this dataset size. Target at 500 images: mAP@50 > 0.75.

Next step: get to 500 labeled images, then run the first real training run.
    `,
  },
  {
    slug: "why-pure-rl-fails-wearables",
    title: "Why Pure RL Fails for Safety-Critical Wearables (And Why We Need MPC)",
    date: "2026-03-28",
    category: "research",
    pillar: "P1",
    tags: ["Reinforcement Learning", "Control Theory", "Wearables", "MPC"],
    readTime: "12 min",
    excerpt: "Exploring the limitations of pure reinforcement learning in safety-critical applications and the case for hybrid RL+MPC controllers.",
    content: `
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

\`\`\`python
# Simplified MPC setup with scipy
from scipy.optimize import minimize
import numpy as np

def mpc_step(state, model, N=30, constraints=None):
    def cost(u_sequence):
        states = simulate_forward(state, u_sequence, model)
        return thermal_comfort_loss(states) + control_effort(u_sequence)
    
    result = minimize(cost, x0=np.zeros(N), constraints=constraints)
    return result.x[0]  # Apply first action only
\`\`\`

## The Hybrid Case

Pure MPC has a problem too: it requires an accurate model. Our thermal model is approximate — PCM dynamics are nonlinear and hysteresis-laden.

The hybrid approach: **RL learns the residual**. MPC handles safety and long-horizon planning; RL adapts to model mismatch in real time. This is the architecture I'm building.

The key insight: use MPC as a *constraint layer* for RL. The RL policy proposes actions, MPC clips them to the safe set. Neither system is fully in charge.
    `,
  },
  {
    slug: "thermal-simulation-fourier-baseline",
    title: "Week 1: First Thermal Simulation Results (Fourier's Law Baseline)",
    date: "2026-04-22",
    category: "devlog",
    pillar: "P1",
    tags: ["Thermal Modeling", "Simulation", "Python"],
    readTime: "3 min",
    excerpt: "Initial 1D thermal simulation using Fourier's law. Results, surprises, and what I got wrong on the first try.",
    content: `
## What I Built

A 1D finite-difference simulation of heat transfer through a 5-layer textile stack:
1. Outer shell (polyester)
2. Insulation layer
3. PCM (Phase Change Material) layer
4. Inner moisture-wicking layer  
5. Skin boundary condition

Simple Fourier conduction: q = -k · dT/dx

\`\`\`python
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
\`\`\`

## What Went Wrong

**The PCM layer blew up.** I forgot to handle latent heat. When the PCM hits its melting point (~28°C), it absorbs heat without changing temperature — that requires a separate enthalpy tracking variable, not just Cp.

This is exactly the kind of thing that doesn't show up in textbook problems. The simulation was running and producing numbers and the numbers looked plausible. It took me plotting the phase-change region to notice the temperature was advancing through the PCM too quickly.

## Fix

Added enthalpy tracking with a Stefan condition at the phase boundary. Now the PCM correctly "absorbs" heat for ~40 simulation seconds before the temperature front advances.

**Next**: extend to 2D, add the TEG power harvesting model, couple to the comfort metric.
    `,
  },
  {
    slug: "yolov8-dataset-labeling-week2",
    title: "Week 2: YOLOv8 Dataset Labeling — 47 Images Done",
    date: "2026-04-20",
    category: "devlog",
    pillar: "P2",
    tags: ["YOLOv8", "Dataset", "Roboflow"],
    readTime: "2 min",
    excerpt: "Progress update on fabric defect dataset creation. Lessons from the first 47 annotations.",
    content: `
## Current Status

47 / 500 target images annotated. Classes: broken_warp, broken_weft, oil_stain, hole.

## What's Taking Time

Honestly? Deciding where a defect *ends*. Broken warp threads extend along the full warp length in theory, but the visible damage might be localized. I've been labeling the visually distinct damage region only, not the full thread path.

This will need to be consistent across all 500 images. I made a labeling guide for myself after image 20 when I realized my early boxes were inconsistently sized.

## Roboflow Workflow

Using Roboflow's web annotator. It's decent. The smart polygon tool doesn't work well for thin linear defects — bounding boxes only for now.

Auto-augmentation preview in Roboflow: the HSV jitter settings look good. I'll keep mosaic on.

**Target**: 500 images by end of May. Then first real training run.
    `,
  },
  {
    slug: "cosine-similarity-multilingual-embeddings",
    title: "Week 2: Cosine Similarity Baselines for Multilingual Embeddings",
    date: "2026-04-18",
    category: "devlog",
    pillar: "P3",
    tags: ["NLP", "Embeddings", "RAG"],
    readTime: "3 min",
    excerpt: "Benchmarking LaBSE and multilingual-E5 on cross-lingual similarity tasks for materials science queries.",
    content: `
## The Baseline Task

Given a query in English: "thermal conductivity of polyester fiber", retrieve the most relevant document from a small test corpus that includes German, Japanese, and Arabic documents.

Metric: cosine similarity between query embedding and document embeddings.

## Models Tested

- **LaBSE** (Language-Agnostic BERT Sentence Embeddings)
- **multilingual-e5-base**
- **paraphrase-multilingual-mpnet-base-v2** (baseline)

\`\`\`python
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('sentence-transformers/LaBSE')
query = "thermal conductivity of polyester fiber"
query_emb = model.encode([query])

docs_de = ["Wärmeleitfähigkeit von Polyesterfasern beträgt etwa 0.04 W/mK"]
doc_embs = model.encode(docs_de)

similarity = np.dot(query_emb, doc_embs.T)[0][0]
# LaBSE result: 0.71 — pretty strong cross-lingual signal
\`\`\`

## Results (mini-corpus, n=20)

| Model | EN-DE | EN-JA | EN-AR |
|---|---|---|---|
| LaBSE | 0.71 | 0.63 | 0.68 |
| mE5-base | 0.74 | 0.67 | 0.65 |
| mpnet | 0.58 | 0.44 | 0.51 |

mE5 edges out LaBSE on German and Japanese. Arabic is roughly tied.

**Next**: build the actual FAISS vector store, test on larger corpus.
    `,
  },
  {
    slug: "cross-lingual-embeddings-materials-science",
    title: "Cross-Lingual Embeddings for Materials Science Literature",
    date: "2026-03-10",
    category: "research",
    pillar: "P3",
    tags: ["NLP", "Embeddings", "RAG", "Materials Science"],
    readTime: "10 min",
    excerpt: "Evaluating multilingual sentence embeddings for cross-lingual retrieval in materials science research.",
    content: `
## The Problem

The materials science literature is polyglot. Significant work on smart textiles, PCM composites, and fiber-based sensors has been published in German (DIN standards), Japanese (Toray, Teijin research), Chinese, and Arabic. The majority of researchers working in English have no systematic access to this literature.

This is not a translation problem. Translation is lossy, slow, and creates a secondary document that drifts from the original. What we need is **direct cross-lingual retrieval** — query in English, retrieve in any language.

## Why This Is Hard for Domain-Specific Text

General multilingual embeddings are trained on web crawls and Wikipedia. Materials science text has a different register: dense technical terminology, units, compound nouns (especially in German). The question is whether off-the-shelf embeddings transfer to this domain.

Early results suggest: partially. LaBSE handles standard technical vocabulary well. It struggles with domain-specific compounds (German: *Wärmeleitfähigkeitsmessverfahren* — thermal conductivity measurement method).

## Architecture

\`\`\`
Query (any language)
  → sentence embedding (LaBSE / mE5)
  → FAISS index search
  → top-k document chunks (any language)
  → LLM synthesis (English output)
\`\`\`

The LLM synthesis step is important: the retrieved chunks may be in 3 different languages. The LLM needs to read all of them and synthesize a coherent answer.

## Open Questions

1. Do we need domain-adaptive fine-tuning for materials science embeddings?
2. What's the right chunking strategy for technical papers (abstract vs. section vs. paragraph)?
3. How do we evaluate when ground truth cross-lingual relevance judgments don't exist?

These are the core problems Pillar 3 is trying to solve.
    `,
  },
  {
    slug: "building-robust-data-pipelines",
    title: "Building Robust Data Pipelines for Research",
    date: "2026-02-20",
    category: "research",
    pillar: null,
    tags: ["Infrastructure", "Python", "Automation"],
    readTime: "6 min",
    excerpt: "How I structured my research data pipelines to avoid the painful mistakes most solo researchers make.",
    content: `
## The Problem with Ad-Hoc Research Code

Early in my projects I was doing what most solo researchers do: Jupyter notebooks, manual data downloads, hardcoded paths, no versioning. This works until it catastrophically doesn't — usually at the worst possible time (before a deadline, or when trying to reproduce results from 3 months ago).

## The Pipeline Structure I Use Now

\`\`\`
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
\`\`\`

Key rule: **notebooks are for exploration only**. No notebook code ever runs in production. Everything that matters gets refactored into \`src/\`.

## Reproducibility

- All random seeds set and logged
- Config files (YAML via Hydra) instead of argparse or hardcoded values
- Weights & Biases for experiment tracking
- DVC for data versioning (in progress)

\`\`\`python
import hydra
from omegaconf import DictConfig

@hydra.main(config_path="configs", config_name="train")
def train(cfg: DictConfig):
    set_seed(cfg.seed)
    model = build_model(cfg.model)
    # ...
\`\`\`

This setup takes a day to set up properly. It saves weeks over a 6-month project.
    `,
  },
  // ── ERRORS / DEVLOG ─────────────────────────────────────────────────────
  {
    slug: "error-pcm-latent-heat",
    title: "ERROR LOG: PCM Phase Change Blowing Up My Simulation",
    date: "2026-04-21",
    category: "devlog",
    pillar: "P1",
    tags: ["Error", "Simulation", "Thermal Modeling", "Debugging"],
    readTime: "4 min",
    excerpt: "Spent 3 hours debugging a thermal sim that was giving plausible-but-wrong results. The fix was embarrassingly simple.",
    content: `
## The Error

Running 1D thermal simulation. Everything looks fine. Temperature gradients look reasonable. Then I plot the PCM layer specifically and notice: the temperature front is moving through the phase-change region at the same speed as the rest of the textile. 

That's wrong. PCM is supposed to *slow down* the temperature front. That's the whole point.

## Root Cause

I was modeling PCM with a single heat capacity Cp. At phase change, PCM absorbs latent heat — meaning temperature stays ~constant while enthalpy changes. I wasn't tracking enthalpy at all.

The simulation was "working" in the sense that it ran without errors and produced numbers. The numbers were physically meaningless.

\`\`\`python
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
\`\`\`

## Lesson

**If your simulation runs without errors and gives plausible results, that's the most dangerous state.** Obvious errors are obvious. Subtle physics errors can live in your code for weeks.

Always validate against known analytical solutions before trusting numerical results. For PCM, the Stefan problem has an analytical solution — I should have checked against it on day 1.
    `,
  },
  {
    slug: "error-faiss-index-mismatch",
    title: "ERROR LOG: FAISS Index Dimension Mismatch at 2am",
    date: "2026-04-16",
    category: "devlog",
    pillar: "P3",
    tags: ["Error", "FAISS", "NLP", "Debugging"],
    readTime: "2 min",
    excerpt: "Classic mistake. FAISS index built with LaBSE, queried with mE5. Dimension mismatch. 45 minutes lost.",
    content: `
## The Error Message

\`\`\`
faiss.swigfaiss.FaissException: Error in faiss::IndexFlat::search
d=768 != d_index=1024
\`\`\`

## What Happened

Built the FAISS index with LaBSE embeddings (768-dim). Later in the notebook, switched to multilingual-e5-large (1024-dim) for a comparison. Forgot to rebuild the index. 45 minutes of confused debugging at 2am.

## The Fix

\`\`\`python
# Always save model name with the index
import pickle

index_metadata = {
    "model_name": "sentence-transformers/LaBSE",
    "dimension": 768,
    "n_docs": len(corpus),
    "created": datetime.now().isoformat()
}

with open("index_metadata.pkl", "wb") as f:
    pickle.dump(index_metadata, f)

# On load, assert dimensions match
assert loaded_model.get_sentence_embedding_dimension() == index_metadata["dimension"]
\`\`\`

## Lesson

Name your artifacts. Every saved model file, index, and checkpoint should encode the model name and key hyperparameters. Future you at 2am will thank you.
    `,
  },
  // ── LANGUAGE LEARNING ────────────────────────────────────────────────────
  {
    slug: "german-month-1-review",
    title: "German Month 1 Review: What's Working, What Isn't",
    date: "2026-04-28",
    category: "language",
    tags: ["German", "Language Learning", "Anki"],
    readTime: "5 min",
    excerpt: "One month into B1 German. Honest assessment of my study methods and the surprises so far.",
    content: `
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
    `,
  },
  {
    slug: "japanese-hiragana-done",
    title: "Japanese: Hiragana Complete — Notes from the First Week",
    date: "2026-04-10",
    category: "language",
    tags: ["Japanese", "Language Learning", "Hiragana"],
    readTime: "3 min",
    excerpt: "Finished the hiragana table. Moving to katakana and JLPT N5 vocab. Some observations on learning a non-Latin script.",
    content: `
## Hiragana: Done

All 46 hiragana characters memorized in 6 days. Method: Anki with the Remembering the Kana deck, plus writing by hand 3x each.

Writing by hand is optional for recognition, but it dramatically accelerates memorization. Something about the motor memory encoding helps. I now associate each character with the physical motion of writing it.

## Observations on Learning a Non-Latin Script

Arabic script (which I've been studying separately for Quranic reading) was harder to start. Right-to-left, letters change shape based on position, no vowel markings. Hiragana by comparison is forgiving: each character is unique, no positional variation, no ambiguity.

The interesting thing: once you break the "I need to read phonetically in Latin characters" dependence, your reading speed jumps immediately. I'm now reading hiragana at a reasonable pace after 1 week. I couldn't do that with romaji after 2 weeks.

## Next

Katakana (similar timeline, ~1 week). Then JLPT N5 vocabulary (~800 words). Then grammar (Genki I).

Target: N4 by end of year.
    `,
  },
  // ── MATH / FUN ───────────────────────────────────────────────────────────
  {
    slug: "bellman-equation-intuition",
    title: "The Bellman Equation is Just a Promise About the Future",
    date: "2026-04-05",
    category: "math",
    tags: ["Reinforcement Learning", "Math", "Intuition"],
    readTime: "6 min",
    excerpt: "Everyone learns the Bellman equation as a formula. Here's how I finally understood it as an idea.",
    content: `
## The Formula vs. The Idea

Most RL courses introduce the Bellman equation like this:

$$V(s) = \\max_a \\left[ R(s, a) + \\gamma \\cdot V(s') \\right]$$

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
    `,
  },
  {
    slug: "why-sim-to-real-is-hard",
    title: "Why Sim-to-Real Transfer is Genuinely Hard (and Kind of Fascinating)",
    date: "2026-03-20",
    category: "math",
    tags: ["Reinforcement Learning", "Robotics", "Sim-to-Real", "Domain Randomization"],
    readTime: "7 min",
    excerpt: "The gap between simulation and reality is a distribution shift problem. Here's what makes it fundamentally different from standard out-of-distribution generalization.",
    content: `
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
    `,
  },
  // ── LINKEDIN / NOTES ─────────────────────────────────────────────────────
  {
    slug: "on-being-a-textile-engineer-doing-ai",
    title: "On Being a Textile Engineer Doing AI Research",
    date: "2026-04-25",
    category: "note",
    tags: ["Reflection", "PhD", "Career"],
    readTime: "3 min",
    excerpt: "People ask why a textile engineer is doing reinforcement learning research. Here's the actual answer.",
    content: `
People ask why a textile engineer is doing RL research.

The honest answer: because textiles are the most underestimated material system in existence. A woven structure is a 2D network of fibers with tunable mechanical, thermal, and electrical properties. It's lightweight, conformable, manufacturable at scale, and sits directly against the human body. And the industry that makes it is essentially running on 1970s automation.

The AI revolution hasn't touched textiles yet. Not really. There are some computer vision systems for defect detection. There are some scheduling optimizations. But the intelligent, self-regulating, energy-autonomous smart material? That doesn't exist yet.

That's not a niche. That's an entire field waiting to be built.

When I started researching PCM thermal regulation, I needed control theory. When I started modeling the control system, I needed RL. When I needed to synthesize research across 8 languages, I needed NLP. The textile problem *generated* the AI problems.

I think the best interdisciplinary researchers don't pick a domain because it's fashionable. They follow a specific physical problem until it forces them into every discipline it touches.

That's the plan.
    `,
  },
];

export const now = {
  lastUpdated: "April 2026",
  location: "Bangladesh 🇧🇩",
  research: [
    "Building 2D thermal simulation model for PCM textile layers (Pillar 1, Phase 1)",
    "Labeling fabric defect dataset in Roboflow — targeting 500 annotated images (Pillar 2)",
    "Evaluating multilingual embedding models for materials science retrieval (Pillar 3)",
  ],
  learning: [
    { flag: "🇩🇪", label: "German", detail: "Month 1 of B1 track. Nicos Weg + Anki Core 2000." },
    { flag: "🇯🇵", label: "Japanese", detail: "Hiragana complete. Beginning JLPT N5 vocab." },
    { flag: "🏋️", label: "Training", detail: "Boxing (Mon), BJJ (Tue), Taekwondo (Wed), Strength (Thu)" },
    { flag: "📚", label: "Islamic Studies", detail: "Rotating — Aqeedah, Fiqh, Hadith, Tafsir" },
    { flag: "💻", label: "LeetCode", detail: "NeetCode 150 — Arrays & Hashing module" },
  ],
  reading: [
    "Art of War — Sun Tzu (Strategic rotation, Week 2)",
    "Muqaddimah — Ibn Khaldun (excerpts)",
    "MIT OCW: Fundamentals of Heat and Mass Transfer (Lectures 1–3)",
  ],
  buildingToward: [
    "PhD applications: 2026–2027 cycle",
    "GRE prep: Active",
    "IELTS prep: Active",
    "First preprint: Target Month 6",
  ],
};
