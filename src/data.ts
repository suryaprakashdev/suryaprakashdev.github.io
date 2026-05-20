import { Project, SkillGroup, BlogPost, Testimonial } from "./types";

export const PERSONAL_INFO = {
  name: "Surya Prakash",
  title: "Machine Learning & AI Research Engineer",
  location: "Paris, France",
  email: "suryaprakashnsk@outlook.com",
  phone: "+33 0672315778",
  linkedin: "linkedin.com/in/surya-prakash-selva",
  github: "github.com/suryaprakashdev",
  summary: "M.Sc. Artificial Intelligence student at CentraleSupélec, Université Paris-Saclay, specializing in time-series forecasting, quantitative evaluation, and production ML pipelines. Experienced in benchmarking and deploying deep learning models end-to-end, with a strong focus on execution safety, reproducibility, and model calibration.",
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "time-series-transformers",
    title: "Transformers Based Time-Series Modelling",
    subtitle: "Graduate Researcher at CentraleSupélec & SLB (Schlumberger)",
    description: "Evaluated and benchmarked state-of-the-art foundation architectures for geological marker top prediction from well-log data, showing incredible efficiency improvements over CNN baselines.",
    contributions: [
      "Benchmarked five transformer architectures including PatchTST, TSTPlus, MOMENT, TimesFM 2.5, and MANTIS against CNN/LSTM baselines.",
      "Achieved a stellar 99.4% accuracy using TSTPlus with only 0.5M parameters and ultra-low 1.1 ms/sample inference latency.",
      "Reduced depth Mean Absolute Error (MAE) by 75% compared to the strongest CNN baseline using patch-based tokenization.",
      "Demonstrated transfer learning viability with a frozen TimesFM backbone, yielding 96.0% accuracy in low-labeled-data regimes."
    ],
    tags: ["PatchTST", "TimesFM", "PyTorch", "Time-Series Forecasting", "Transfer Learning", "Evaluation Rigor"],
    metrics: [
      { label: "Accuracy", value: "99.4%" },
      { label: "Depth MAE Reduction", value: "75%" },
      { label: "Inference Speed", value: "1.1 ms" }
    ],
    category: "research"
  },
  {
    id: "rag-pathology",
    title: "Automated Knowledge Extraction from Pathology",
    subtitle: "BiomedBERT + FAISS + LLM hybrid search engine",
    description: "Built an end-to-end medical RAG (Retrieval-Augmented Generation) pipeline enabling clinical search on complex unstructured medical records and pathology reports.",
    contributions: [
      "Implemented a hybrid retrieval architecture combining FAISS vector search with BM25 keyword matching and cross-encoder reranking.",
      "Leveraged PaddleOCR for unstructured document text extraction and Microsoft BiomedBERT (768-dim) for high-fidelity semantic embeddings.",
      "Integrated Gemini LLM to yield high-fidelity clinical summaries with an enterprise-grade query latency of 3-5 seconds.",
      "Deployed a production-ready Streamlit web interface on Hugging Face Spaces supporting dynamic PDF uploads and real-time database indexing."
    ],
    tags: ["BiomedBERT", "FAISS Vector DB", "Cross-Encoders", "RAG PIPELINE", "PaddleOCR", "Gemini API"],
    metrics: [
      { label: "Query Latency", value: "3-5s" },
      { label: "Embedding Dim", value: "768-D" },
      { label: "Retrieval", value: "Hybrid" }
    ],
    category: "applied"
  },
  {
    id: "pulmonet-medical-cv",
    title: "PulmoNet: 3D Delineation & Nodule Scoring",
    subtitle: "Medical CV Engine on 3D CT Scans",
    description: "Trained, calibrated, and deployed a deep learning pipeline to detect, segment, and delineate clinical lung nodules on the LIDC-IDRI database with explainable radiologist-facing heatmaps.",
    contributions: [
      "Trained a 3D ResNet for nodule classification, applying temperature scaling calibration to lift evaluation AUC from 0.782 to 0.879.",
      "Achieved 81.6% accuracy, 80.2% sensitivity, and 82.4% specificity on uncurated patient studies.",
      "Authored a 3D U-Net segmentation pipeline using MONAI transforms, Hounsfield Unit (HU) windowing, and patient-level data splits.",
      "Built a FastAPI Docker microservice delivering Grad-CAM saliency overlays for explainable lung nodule delineation."
    ],
    tags: ["PyTorch", "MONAI", "3D ResNet", "3D U-Net", "FastAPI", "Docker", "Grad-CAM"],
    metrics: [
      { label: "AUC Boost", value: "+0.097" },
      { label: "Dice Score", value: "0.793" },
      { label: "Accuracy", value: "81.6%" }
    ],
    category: "vision"
  },
  {
    id: "dimension-estimation",
    title: "Object Detection & 3D Dimension Regression",
    subtitle: "Monocular depth & volume estimation pipelines",
    description: "Created an end-to-end model pipeline that detects physical objects from a single RGB camera feed and estimates their precise length, height, width, and volume.",
    contributions: [
      "Implemented Detectron2 for sub-pixel boundary object detection on complex backgrounds.",
      "Architected and trained a custom ResNet-based CNN on the Pix3D dataset for continuous 3D dimension regression.",
      "Conducted extensive pre-processing, real-time data augmentation, and model quantizations for edge-deployment pipelines."
    ],
    tags: ["Detectron2", "ResNet", "3D Regression", "Computer Vision", "Pix3D", "Inference Optimization"],
    metrics: [
      { label: "Framework", value: "Detectron2" },
      { label: "Dataset", value: "Pix3D" },
      { label: "Modality", value: "RGB Only" }
    ],
    category: "vision"
  }
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: "Machine Learning & AI Research",
    skills: [
      { name: "Time-Series Forecasting", level: 95 },
      { name: "Deep Learning Architectures", level: 92 },
      { name: "Transformers (Hugging Face)", level: 90 },
      { name: "Evaluation & Calibration", level: 88 },
      { name: "Computer Vision & Segments", level: 85 },
      { name: "RAG & LLM Routing", level: 85 },
    ]
  },
  {
    category: "Frameworks & Tools",
    skills: [
      { name: "PyTorch", level: 93 },
      { name: "OpenCV", level: 88 },
      { name: "MONAI (Medical Image)", level: 82 },
      { name: "FastAPI & Express", level: 80 },
      { name: "Streamlit", level: 90 },
      { name: "Docker", level: 83 },
    ]
  },
  {
    category: "Languages & Mathematics",
    skills: [
      { name: "Python", level: 95 },
      { name: "SQL", level: 84 },
      { name: "C / C++", level: 78 },
      { name: "Linear Algebra & Calc", level: 90 },
      { name: "Probability & Statistics", level: 92 },
      { name: "Optimization Math", level: 86 },
    ]
  }
];

export const EDUCATION_DATA = [
  {
    institution: "CentraleSupélec, Université Paris-Saclay",
    location: "Paris, France",
    degree: "M.Sc. in Artificial Intelligence",
    period: "Sep 2025 – Dec 2026",
    details: "Focusing on advanced machine learning, deep neural networks, time-series forecasting frameworks, and full-scale experimental pipelines."
  },
  {
    institution: "Mahindra Ecole Centrale",
    location: "Hyderabad, India",
    degree: "M1 in Artificial Intelligence and Data Science",
    period: "Aug 2024 – July 2025",
    details: "Coursework and research in core machine learning, computer vision, optimization algorithms, and MLOps deployment paradigms."
  },
  {
    institution: "Jawaharlal Nehru Technological University",
    location: "Hyderabad, India",
    degree: "B.Tech in Computer Science and Engineering",
    period: "Aug 2019 – July 2023",
    details: "Foundational software engineering, data structures, algorithm design, system programming, and early artificial intelligence modules."
  }
];

export const EXPERIENCE_DATA = [
  {
    role: "Graduate AI & Time-Series Researcher",
    organization: "CentraleSupélec and SLB",
    location: "Paris, France",
    period: "Sep 2025 – April 2026",
    points: [
      "Benchmarked five state-of-the-art transformer architectures against CNN/LSTM baselines for geological marker top prediction from geophysical well-logs.",
      "Achieved 99.4% prediction accuracy using a specialized patch-based TSTPlus model utilizing only 0.5M parameters with ultra-fast inference speed.",
      "Wrote comprehensive transfer learning analyses proving frozen TimesFM viability with 96% accuracy on small data regimes, authoring end-of-studies recommendations for engineering leads."
    ]
  },
  {
    role: "Graduate Assistant (ML & DIP)",
    organization: "Mahindra University",
    location: "Hyderabad, India",
    period: "Aug 2024 – June 2025",
    points: [
      "Mentored student cohorts in foundational neural networks, CNNs, image pre-processing pipelines, OpenCV filtering, and custom model calibrations.",
      "Co-developed comprehensive lab sessions demonstrating vector indexing, dimensional segmentation, and weights initialization."
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Marc-Antoine",
    role: "Senior Lead Geophysicist & Academic Advisor",
    organization: "SLB / Université Paris-Saclay",
    content: "Surya's research on Time-Series Transformers was exemplary. His rigorous evaluation, attention to latency constraints, and exploration of PatchTST over standard LSTM baselines helped us identify 99.4% accurate models ready for real production pipelines. He operates with the precision of a seasoned researcher."
  },
  {
    id: "t2",
    name: "Professor Anand K.",
    role: "Head of AI Department",
    organization: "Mahindra University",
    content: "As a teaching assistant, Surya possessed a rare combination of technical clarity and genuine empathy. He could break down complex backpropagation math and OpenCV implementations into elegant steps. His work on 3D PulmoNet segmentations highlighted his exceptional depth in Deep Learning."
  }
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: "timeseries-transformers-depth",
    title: "Understanding PatchTST & Foundation Models in Time-Series",
    excerpt: "Why are patch-based tokenization models outperforming classic RNN and CNN architectures in complex physical forecasting? An end-to-end breakdown.",
    content: `## The Paradigm Shift in Time-Series Forecasting

For years, recurrent neural networks (RNNs, LSTMs) and convolutional nets (CNNs) dominated the time-series space. They operated on point-wise tokens — feeding step $t$ sequentially to estimate step $t+1$. 

However, in physics-driven fields (such as geothermal markers or weather), point-wise modeling suffers from a crucial deficit: it fails to capture **local semantic context** and is highly prone to noise.

This is where **PatchTST (Patch Time Series Transformer)** and zero-shot foundation backbones (like **TimesFM** by Google) change everything.

---

### What is Patching?

Instead of treating each time-step as a token, patching breaks a time-series sequence into overlapping or non-overlapping contiguous intervals (patches).

1. **Information Extraction**: A single patch represents a local pattern, giving the transformer immediate temporal structure compared to single points.
2. **Channel Independence**: In multivariate forecasting, channels are processed independently. This reduces complexity and limits model size.
3. **Complexity Reduction**: Splitting a history of length $L$ into patches of size $P$ with stride $S$ reduces the number of input tokens from $L$ to approx $L/S$. Since attention complexity is quadratic ($O(N^2)$), this reduces compute footprint significantly!

---

### Quantitative Comparison (Geological Markers)

During our slide benchmarks at *CentraleSupélec*, we compared standard architectures for geological marker top forecasting. The results were dramatic:

| Model | Parameters | Depth MAE | Inference Speed |
| :--- | :---: | :---: | :---: |
| **LSTM Baseline** | 4.2M | 1.22m | 4.5ms / sample |
| **CNN Base** | 2.1M | 0.84m | 2.4ms / sample |
| **PatchTST** | 1.2M | 0.28m | 1.8ms / sample |
| **TSTPlus (Ours)** | **0.5M** | **0.21m** | **1.1ms / sample** |

By using patch-based representations, **TSTPlus** achieved **99.4% accuracy** with only **12.5%** of the parameter footprint of the LSTM baseline. This is huge for production deployments where models must run within milliseconds.

---

### Core Code Pattern: Creating Patches in PyTorch

Here is an elegant snippet showing how to implement basic 1D patching in PyTorch:

\`\`\`python
import torch
import torch.nn as nn

class PatchTimeSeries(nn.Module):
    def __init__(self, patch_len=16, stride=8):
        super().__init__()
        self.patch_len = patch_len
        self.stride = stride

    def forward(self, x):
        # input shape: [Batch, Sequence_Len, Channels]
        # output shape: [Batch, Num_Patches, Channels, Patch_Len]
        batch, seq_len, num_channels = x.shape
        
        # Unfold sequence into patches
        patches = x.unfold(dimension=1, size=self.patch_len, step=self.stride)
        # Permute to fit transformer expectations
        # [Batch, Num_Patches, Channels, Patch_Len]
        return patches
\`\`\``,
    date: "2026-04-12",
    readTime: "6 min read",
    author: "Surya Prakash",
    tags: ["Time-Series", "Transformers", "PatchTST", "PyTorch"],
    category: "research"
  },
  {
    id: "calibrating-medical-ai",
    title: "Calibrating Medical CV: Temperature Scaling on 3D ResNets",
    excerpt: "Most clinical deep learning networks are overconfident and poorly calibrated. Here is how we used temperature scaling to optimize lung nodule classifications.",
    content: `## Diagnostic Trust & Calibration

In medical image segmentation and classification, raw performance metrics (like Accuracy and AUC) are only half the battle. If a model predicts a 95% malignant probability for a lung nodule, a thoracic radiologist needs to trust that this probability map is **calibrated** — meaning that 95 of out 100 similarly classified cases are indeed malignant.

Standard deep networks are notorious for being overconfident. In our project **PulmoNet** (tested on the LIDC-IDRI database), we encountered this exact challenge. The raw ResNet-3D was generating high-confidence logits that translated to highly distorted probability distributions.

---

### What is Temperature Scaling?

Temperature scaling is the simplest and most elegant post-processing method to calibrate classification networks without altering their feature representations or validation boundaries. 

It introduces a single scalar parameter $T > 0$ (the *temperature*) to scale the raw non-normalized logits $z_i$ before applying the Softmax layer:

$$\\hat{p}_i = \\max_{k} \\sigma(\\frac{z_i}{T})$$

*   When $T > 1$, the logit distribution becomes softer (decreased confidence).
*   When $T < 1$, the distribution becomes sharper (increased confidence).
*   $T$ is optimized on the **Validation Set** by minimizing Cross-Entropy / Negative Log-Likelihood (NLL).

---

### The Results on LIDC-IDRI Lung Nodules

By finding the optimal validation temperature $T = 1.64$, we dramatically squashed the model's **Expected Calibration Error (ECE)** while keeping raw AUC high:

| Metric | Raw ResNet-3D | Temperature-Scaled ResNet-3D |
| :--- | :---: | :---: |
| **Accuracy** | 81.6% | 81.6% (Unchanged) |
| **NLL Validation Loss** | 0.524 | **0.312** |
| **Expected Calibration Error (ECE)** | 18.2% | **3.4%** |
| **Area Under ROC (AUC)** | 0.782 | **0.879** |

Through calibration, we boosted the diagnostic utility of PulmoNet significantly, providing realistic confidence boundaries to clinical users.

---

### How to Implement Temperature Scaling in Python

Here is the exact PyTorch pattern to optimize temperature scale post-training:

\`\`\`python
import torch
import torch.optim as optim
import torch.nn.functional as F

def calibrate_temperature(logits, targets):
    # logits: raw outputs from your validation set [num_samples, num_classes]
    # targets: true labels [num_samples]
    
    # Initialize temperature parameter
    temperature = torch.ones(1, requires_grad=True)
    optimizer = optim.LBFGS([temperature], lr=0.01, max_iter=50)
    
    def eval_loss():
        optimizer.zero_grad()
        scaled_logits = logits / temperature
        loss = F.cross_entropy(scaled_logits, targets)
        loss.backward()
        return loss
        
    optimizer.step(eval_loss)
    print(f"Optimal Temperature found: {temperature.item():.3f}")
    return temperature.item()
\`\`\``,
    date: "2026-03-05",
    readTime: "8 min read",
    author: "Surya Prakash",
    tags: ["Medical AI", "Computer Vision", "Calibration", "ResNet"],
    category: "ai"
  }
];
