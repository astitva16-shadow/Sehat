import express from 'express';

const router = express.Router();

// Symptom checker with basic AI-like logic
router.post('/check', async (req, res) => {
  try {
    const { symptoms, age, gender, existingConditions } = req.body;

    if (!symptoms) {
      return res.status(400).json({ success: false, message: 'Symptoms are required' });
    }

    const symptomsLower = symptoms.toLowerCase();
    
    // Rule-based symptom analysis
    const analysis = analyzeSymptoms(symptomsLower, age, gender);

    res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error('Symptom check error:', error);
    res.status(500).json({ success: false, message: 'Error analyzing symptoms' });
  }
});

function analyzeSymptoms(symptoms, age, gender) {
  let concernLevel = 'Mild';
  let possibleConditions = [];
  let homeCare = [];
  let dietTips = [];
  let suggestedSpecialty = 'General Physician';
  let urgency = 'normal';

  // Critical symptoms - require immediate attention
  const criticalKeywords = [
    'chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious',
    'stroke', 'heart attack', 'suicide', 'severe burn', 'poisoning',
    'head injury', 'can\'t breathe', 'choking'
  ];

  for (const keyword of criticalKeywords) {
    if (symptoms.includes(keyword)) {
      return {
        concernLevel: 'Severe',
        urgency: 'emergency',
        message: '⚠️ EMERGENCY: Please call emergency services (112/108) immediately or visit the nearest emergency room.',
        possibleConditions: ['Medical Emergency'],
        homeCare: ['Call emergency services immediately', 'Do not delay seeking medical attention'],
        dietTips: [],
        suggestedSpecialty: 'Emergency Medicine',
        disclaimer: 'This is a medical emergency. Seek immediate professional help.'
      };
    }
  }

  // Fever related
  if (symptoms.includes('fever') || symptoms.includes('temperature')) {
    concernLevel = 'Moderate';
    possibleConditions.push('Viral Infection', 'Bacterial Infection', 'Flu');
    homeCare.push('Stay hydrated - drink plenty of water and fluids');
    homeCare.push('Rest adequately');
    homeCare.push('Take prescribed fever medication');
    dietTips.push('Light, easily digestible foods like khichdi, soup');
    dietTips.push('Fresh fruit juices (orange, coconut water)');
    dietTips.push('Avoid heavy, oily, or spicy foods');
    
    if (symptoms.includes('cough') || symptoms.includes('cold')) {
      possibleConditions.push('Common Cold', 'Respiratory Infection');
      homeCare.push('Gargle with warm salt water');
      homeCare.push('Steam inhalation can help');
      dietTips.push('Warm ginger tea with honey');
      dietTips.push('Turmeric milk before bed');
    }
  }

  // Respiratory symptoms
  if (symptoms.includes('cough') || symptoms.includes('cold') || symptoms.includes('sore throat')) {
    if (concernLevel === 'Mild') concernLevel = 'Moderate';
    possibleConditions.push('Upper Respiratory Infection', 'Common Cold', 'Throat Infection');
    homeCare.push('Warm water gargle with salt');
    homeCare.push('Stay warm and avoid cold drinks');
    homeCare.push('Rest your voice if throat is sore');
    dietTips.push('Warm soups and broths');
    dietTips.push('Honey with warm water or tea');
    dietTips.push('Avoid cold, icy foods');
    suggestedSpecialty = 'ENT Specialist or General Physician';
  }

  // Stomach issues
  if (symptoms.includes('stomach') || symptoms.includes('diarrhea') || 
      symptoms.includes('vomit') || symptoms.includes('nausea') || symptoms.includes('acidity')) {
    concernLevel = 'Moderate';
    possibleConditions.push('Gastroenteritis', 'Food Poisoning', 'Indigestion', 'Acidity');
    homeCare.push('Stay hydrated with ORS or electrolyte solution');
    homeCare.push('Eat small, frequent meals');
    homeCare.push('Avoid solid food initially if vomiting');
    dietTips.push('BRAT diet: Bananas, Rice, Applesauce, Toast');
    dietTips.push('Plain yogurt (curd) with a pinch of salt');
    dietTips.push('Avoid spicy, oily, and fried foods');
    dietTips.push('Avoid dairy products except curd');
    dietTips.push('Ginger tea or jeera water for nausea');
    suggestedSpecialty = 'Gastroenterologist or General Physician';
  }

  // Headache
  if (symptoms.includes('headache') || symptoms.includes('migraine')) {
    if (concernLevel === 'Mild') concernLevel = 'Moderate';
    possibleConditions.push('Tension Headache', 'Migraine', 'Dehydration', 'Stress');
    homeCare.push('Rest in a dark, quiet room');
    homeCare.push('Apply cold compress on forehead');
    homeCare.push('Stay hydrated');
    homeCare.push('Practice relaxation techniques');
    dietTips.push('Drink plenty of water');
    dietTips.push('Avoid caffeine and alcohol');
    dietTips.push('Eat regular, balanced meals');
    suggestedSpecialty = 'Neurologist or General Physician';
  }

  // Body pain / weakness
  if (symptoms.includes('body pain') || symptoms.includes('weakness') || 
      symptoms.includes('fatigue') || symptoms.includes('tired')) {
    possibleConditions.push('Viral Infection', 'Vitamin Deficiency', 'Anemia', 'Overexertion');
    homeCare.push('Adequate rest and sleep (7-8 hours)');
    homeCare.push('Light stretching or yoga');
    homeCare.push('Avoid strenuous activities');
    dietTips.push('Protein-rich foods: eggs, dal, chicken, fish');
    dietTips.push('Iron-rich foods: spinach, dates, raisins, beetroot');
    dietTips.push('Vitamin C foods: oranges, lemon, amla');
    dietTips.push('Dry fruits and nuts (almonds, walnuts)');
    suggestedSpecialty = 'General Physician';
  }

  // Skin issues
  if (symptoms.includes('rash') || symptoms.includes('itching') || 
      symptoms.includes('skin') || symptoms.includes('allergy')) {
    possibleConditions.push('Allergic Reaction', 'Skin Infection', 'Dermatitis');
    homeCare.push('Avoid scratching the affected area');
    homeCare.push('Keep the area clean and dry');
    homeCare.push('Use prescribed antihistamines if needed');
    dietTips.push('Avoid known allergens');
    dietTips.push('Increase water intake');
    dietTips.push('Eat fresh fruits and vegetables');
    suggestedSpecialty = 'Dermatologist';
  }

  // Diabetes-related
  if (symptoms.includes('diabetes') || symptoms.includes('sugar') || 
      symptoms.includes('frequent urination') || symptoms.includes('thirsty')) {
    concernLevel = 'Moderate';
    possibleConditions.push('Diabetes', 'High Blood Sugar', 'Urinary Tract Infection');
    homeCare.push('Monitor blood sugar levels regularly');
    homeCare.push('Stay hydrated');
    dietTips.push('Low glycemic index foods');
    dietTips.push('Whole grains, vegetables, lean proteins');
    dietTips.push('Avoid sugary drinks and sweets');
    dietTips.push('Regular small meals throughout the day');
    suggestedSpecialty = 'Endocrinologist';
  }

  // Cardiac symptoms
  if (symptoms.includes('palpitation') || symptoms.includes('heart racing') || 
      symptoms.includes('dizziness')) {
    concernLevel = 'Moderate';
    urgency = 'prompt';
    possibleConditions.push('Cardiac Arrhythmia', 'Anxiety', 'Low Blood Pressure');
    homeCare.push('Sit or lie down if feeling dizzy');
    homeCare.push('Avoid caffeine and stimulants');
    homeCare.push('Practice deep breathing exercises');
    dietTips.push('Adequate salt intake for blood pressure');
    dietTips.push('Stay hydrated');
    dietTips.push('Avoid excessive caffeine');
    suggestedSpecialty = 'Cardiologist';
  }

  // Default advice if nothing specific matched
  if (possibleConditions.length === 0) {
    possibleConditions.push('General health concern');
    homeCare.push('Monitor symptoms for 24-48 hours');
    homeCare.push('Stay hydrated and get adequate rest');
    homeCare.push('Maintain a balanced diet');
    dietTips.push('Eat balanced meals with fruits and vegetables');
    dietTips.push('Stay hydrated with water');
  }

  return {
    concernLevel,
    urgency,
    possibleConditions,
    homeCare,
    dietTips,
    suggestedSpecialty,
    disclaimer: '⚠️ IMPORTANT: This is NOT a medical diagnosis. This tool provides general information only. Please consult a qualified healthcare professional for proper diagnosis and treatment. If symptoms worsen or persist, seek immediate medical attention.'
  };
}

export default router;
