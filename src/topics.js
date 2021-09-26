import slugify from 'slugify';

const topics = [
  'Causality',
  'Computer Simulation',
  'Confirmation and Evidence',
  'Decision Theory',
  'Ethics of science',
  'Experiment',
  'Feminist Philosophy of Science',
  'Formal Epistemology',
  'Game Theory',
  'General philosophy of science',
  'History of Biology',
  'History of Environmental Science',
  'History of philosophy of science',
  'History of Physics',
  'History of Social Science',
  'Laws of Nature',
  'Logic and Science',
  'Measurement',
  'Mechanisms',
  'Methods and Tools',
  'Natural Kinds / Classification',
  'Observation',
  'Philosophy of Astronomy / Cosmology',
  'Philosophy of Biology',
  'Philosophy of Chemistry',
  'Philosophy of Climate Science',
  'Philosophy of Cognitive Science',
  'Philosophy of Computer Science',
  'Philosophy of Economics',
  'Philosophy of Engineering',
  'Philosophy of Environmental Science',
  'Philosophy of Geology / Geophysics',
  'Philosophy of Information',
  'Philosophy of Mathematics',
  'Philosophy of Medicine',
  'Philosophy of Neuroscience',
  'Philosophy of Physics',
  'Philosophy of Psychology',
  'Philosophy of Social Science',
  'Philosophy of Technology',
  'Prediction',
  'Probability and Statistics',
  'Realism / Anti-realism / Instrumentalism',
  'Reduction and Inter-theoretic Relations',
  'Representation',
  'Science policy',
  'Scientific Models / Modeling',
  'Scientific Progress',
  'Scientific Theories',
  'Sociology of Science',
  'Teaching philosophy of science',
  'Values in Science',
];

const topicMap = topics.reduce((previous, current) => {
  const slug = slugify(current, { lower: true });
  previous[current] = { name: current, slug };
  return previous;
}, {});

export { topicMap, topics };
