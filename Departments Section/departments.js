const departments = {
  A: {
    "Academics": {
      heading: "Academics Department",
      description: "Responsible for all academic programs, curriculum development, and educational quality control.",
      points: [
        "Design and update course content",
        "Conduct faculty training programs",
        "Ensure academic compliance"
      ]
    },
    "Administration": {
      heading: "Administration Department",
      description: "Manages the overall operations and strategic planning of the institution.",
      points: [
        "Policy development and implementation",
        "Resource allocation",
        "Strategic planning"
      ]
    }
  },
  B: {
    "Billing": {
      heading: "Billing Department",
      description: "Handles all financial transactions and patient billing processes.",
      points: [
        "Insurance claim processing",
        "Patient billing inquiries",
        "Payment plan setup"
      ]
    },
    "Biochemistry": {
      heading: "Biochemistry Lab",
      description: "Conducts biochemical analysis and research.",
      points: [
        "Blood chemistry analysis",
        "Hormone level testing",
        "Metabolic disorder screening"
      ]
    }
  },
  C: {
    "Cardiology": {
      heading: "Cardiology Department",
      description: "Specializes in heart health and cardiovascular diseases.",
      points: [
        "Echocardiograms",
        "Stress tests",
        "Cardiac rehabilitation"
      ]
    },
    "Customer Service": {
      heading: "Customer Service",
      description: "Provides support and assistance to patients and visitors.",
      points: [
        "Appointment scheduling",
        "General inquiries",
        "Patient feedback collection"
      ]
    }
  },
  D: {
    "Dermatology": {
      heading: "Dermatology Department",
      description: "Specializes in skin health and treatment of skin conditions.",
      points: [
        "Skin cancer screening",
        "Acne treatment",
        "Cosmetic dermatology"
      ]
    },
    "Dietetics": {
      heading: "Dietetics and Nutrition",
      description: "Provides nutritional counseling and meal planning.",
      points: [
        "Weight management programs",
        "Medical nutrition therapy",
        "Dietary assessments"
      ]
    }
  },
  E: {
    "Emergency": {
      heading: "Emergency Department",
      description: "Provides immediate care for acute illnesses and injuries.",
      points: [
        "24/7 emergency care",
        "Trauma center",
        "Emergency surgery"
      ]
    },
    "Endocrinology": {
      heading: "Endocrinology Department",
      description: "Specializes in hormone-related disorders.",
      points: [
        "Diabetes management",
        "Thyroid disorders",
        "Metabolic disorders"
      ]
    }
  },
  F: {
    "Finance": {
      heading: "Finance Department",
      description: "Manages the institution's financial operations.",
      points: [
        "Budget planning",
        "Financial reporting",
        "Investment management"
      ]
    },
    "Family Medicine": {
      heading: "Family Medicine",
      description: "Provides comprehensive healthcare for all ages.",
      points: [
        "Preventive care",
        "Chronic disease management",
        "Pediatric to geriatric care"
      ]
    }
  },
  G: {
    "Gastroenterology": {
      heading: "Gastroenterology Department",
      description: "Specializes in digestive system disorders.",
      points: [
        "Colonoscopies",
        "Liver disease treatment",
        "IBD management"
      ]
    },
    "Gynecology": {
      heading: "Gynecology Department",
      description: "Provides women's health services.",
      points: [
        "Annual exams",
        "Reproductive health",
        "Menopause management"
      ]
    }
  },
  H: {
    "Hematology": {
      heading: "Hematology Department",
      description: "Specializes in blood disorders.",
      points: [
        "Anemia treatment",
        "Blood clotting disorders",
        "Leukemia diagnosis"
      ]
    },
    "Human Resources": {
      heading: "Human Resources",
      description: "Manages staff recruitment and development.",
      points: [
        "Employee benefits",
        "Training programs",
        "Staff recruitment"
      ]
    }
  },
  I: {
    "IT": {
      heading: "Information Technology",
      description: "Manages technology infrastructure and systems.",
      points: [
        "Network maintenance",
        "Software support",
        "Data security"
      ]
    },
    "Immunology": {
      heading: "Immunology Department",
      description: "Specializes in immune system disorders.",
      points: [
        "Allergy testing",
        "Autoimmune disease treatment",
        "Immunotherapy"
      ]
    }
  },
  N: {
    "Neurology": {
      heading: "Neurology Department",
      description: "Specializes in nervous system disorders.",
      points: [
        "Epilepsy treatment",
        "Stroke rehabilitation",
        "Multiple sclerosis care"
      ]
    },
    "Nephrology": {
      heading: "Nephrology Department",
      description: "Specializes in kidney diseases.",
      points: [
        "Dialysis services",
        "Kidney transplant evaluation",
        "Hypertension management"
      ]
    }
  },
  O: {
    "Oncology": {
      heading: "Oncology Department",
      description: "Specializes in cancer treatment.",
      points: [
        "Chemotherapy",
        "Radiation therapy",
        "Cancer screening"
      ]
    },
    "Ophthalmology": {
      heading: "Ophthalmology Department",
      description: "Specializes in eye care.",
      points: [
        "Cataract surgery",
        "Glaucoma treatment",
        "Vision correction"
      ]
    }
  },
  P: {
    "Pediatrics": {
      heading: "Pediatrics Department",
      description: "Provides healthcare for children.",
      points: [
        "Well-child visits",
        "Vaccinations",
        "Developmental screenings"
      ]
    },
    "Pharmacy": {
      heading: "Pharmacy Services",
      description: "Provides medication management.",
      points: [
        "Prescription filling",
        "Medication counseling",
        "Compounding services"
      ]
    }
  },
  R: {
    "Radiology": {
      heading: "Radiology Department",
      description: "Provides medical imaging services.",
      points: [
        "X-rays",
        "MRI scans",
        "Ultrasound imaging"
      ]
    },
    "Rehabilitation": {
      heading: "Rehabilitation Services",
      description: "Provides physical therapy and recovery services.",
      points: [
        "Physical therapy",
        "Occupational therapy",
        "Speech therapy"
      ]
    }
  },
  S: {
    "Surgery": {
      heading: "Surgery Department",
      description: "Provides various surgical services.",
      points: [
        "General surgery",
        "Minimally invasive procedures",
        "Post-operative care"
      ]
    },
    "Security": {
      heading: "Security Department",
      description: "Ensures safety and security of the facility.",
      points: [
        "24/7 surveillance",
        "Emergency response",
        "Access control"
      ]
    }
  },
  U: {
    "Urology": {
      heading: "Urology Department",
      description: "Specializes in urinary system health.",
      points: [
        "Prostate screening",
        "Kidney stone treatment",
        "Bladder health"
      ]
    }
  }
};