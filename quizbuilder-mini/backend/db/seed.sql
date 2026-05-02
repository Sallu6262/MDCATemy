-- =========================================================
-- QuizBuilder-Mini seed data
-- 5 subjects, 30 MCQs (6 per subject), mixed difficulty.
-- =========================================================

INSERT INTO subjects (subject_name) VALUES
    ('Biology'),
    ('Chemistry'),
    ('Physics'),
    ('English'),
    ('Logical Reasoning');

-- ---------------- BIOLOGY (subject_id = 1) ----------------
INSERT INTO mcq_bank (question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id) VALUES
('Which organelle is known as the powerhouse of the cell?',
 'Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus',
 'B', 'Mitochondria generate most of the cell''s ATP via oxidative phosphorylation.', 'EASY', 1),

('The basic functional unit of the kidney is the:',
 'Neuron', 'Nephron', 'Alveolus', 'Hepatocyte',
 'B', 'Each kidney contains roughly a million nephrons that filter blood.', 'EASY', 1),

('DNA replication occurs during which phase of the cell cycle?',
 'G1', 'S', 'G2', 'M',
 'B', 'DNA is synthesised during the S (synthesis) phase of interphase.', 'MEDIUM', 1),

('Which blood cells are primarily responsible for oxygen transport?',
 'Platelets', 'Lymphocytes', 'Erythrocytes', 'Neutrophils',
 'C', 'Erythrocytes (red blood cells) carry oxygen via haemoglobin.', 'EASY', 1),

('Photosynthesis primarily occurs in which plant organelle?',
 'Mitochondria', 'Chloroplast', 'Vacuole', 'Nucleus',
 'B', 'Chloroplasts contain chlorophyll which captures light energy.', 'MEDIUM', 1),

('Which type of joint allows rotational movement around a single axis?',
 'Hinge', 'Ball and socket', 'Pivot', 'Saddle',
 'C', 'A pivot joint (e.g. atlas-axis) permits rotation about one axis.', 'HARD', 1);

-- ---------------- CHEMISTRY (subject_id = 2) ----------------
INSERT INTO mcq_bank (question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id) VALUES
('What is the atomic number of carbon?',
 '4', '6', '8', '12',
 'B', 'Carbon has 6 protons, hence atomic number 6.', 'EASY', 2),

('Which gas is most abundant in Earth''s atmosphere?',
 'Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon',
 'C', 'Nitrogen makes up about 78% of the atmosphere.', 'EASY', 2),

('The pH of a neutral solution at 25°C is:',
 '0', '7', '14', '1',
 'B', 'Pure water at 25°C has a pH of 7.', 'EASY', 2),

('Which type of bond is formed between Na and Cl in NaCl?',
 'Covalent', 'Ionic', 'Metallic', 'Hydrogen',
 'B', 'Sodium donates an electron to chlorine forming an ionic bond.', 'MEDIUM', 2),

('Which of the following is an example of an alkaline earth metal?',
 'Sodium', 'Calcium', 'Aluminium', 'Iron',
 'B', 'Calcium is in Group 2 of the periodic table (alkaline earth metals).', 'MEDIUM', 2),

('How many electrons can the third shell (n=3) of an atom hold at maximum?',
 '8', '18', '32', '2',
 'B', 'Using 2n^2: 2 * 3^2 = 18 electrons.', 'HARD', 2);

-- ---------------- PHYSICS (subject_id = 3) ----------------
INSERT INTO mcq_bank (question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id) VALUES
('The SI unit of force is the:',
 'Joule', 'Newton', 'Pascal', 'Watt',
 'B', '1 N = 1 kg·m/s^2.', 'EASY', 3),

('The approximate acceleration due to gravity on Earth is:',
 '9.8 m/s^2', '8.9 m/s^2', '10.8 m/s^2', '7.8 m/s^2',
 'A', 'Standard gravity is 9.81 m/s^2.', 'EASY', 3),

('Which law states ''For every action there is an equal and opposite reaction''?',
 'Newton''s First Law', 'Newton''s Second Law', 'Newton''s Third Law', 'Hooke''s Law',
 'C', 'This is the textbook statement of Newton''s third law.', 'EASY', 3),

('The SI unit of electric current is the:',
 'Volt', 'Ohm', 'Ampere', 'Coulomb',
 'C', 'Current is measured in amperes (A).', 'EASY', 3),

('Sound waves travel fastest in:',
 'Vacuum', 'Air', 'Water', 'Steel',
 'D', 'Sound travels faster in denser elastic media; fastest in solids like steel.', 'MEDIUM', 3),

('A 2 kg object accelerates at 3 m/s^2. What net force acts on it?',
 '1 N', '5 N', '6 N', '9 N',
 'C', 'F = ma = 2 * 3 = 6 N.', 'HARD', 3);

-- ---------------- ENGLISH (subject_id = 4) ----------------
INSERT INTO mcq_bank (question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id) VALUES
('Choose the correct synonym of "Abundant":',
 'Scarce', 'Plentiful', 'Empty', 'Rare',
 'B', '"Abundant" means existing in large quantities, i.e. plentiful.', 'EASY', 4),

('Choose the correct antonym of "Brave":',
 'Bold', 'Heroic', 'Cowardly', 'Daring',
 'C', '"Cowardly" is the opposite of "Brave".', 'EASY', 4),

('The plural form of "Child" is:',
 'Childs', 'Childes', 'Children', 'Childrens',
 'C', '"Children" is the irregular plural of "child".', 'EASY', 4),

('Identify the part of speech of the underlined word: "She runs QUICKLY."',
 'Noun', 'Verb', 'Adjective', 'Adverb',
 'D', '"Quickly" modifies the verb "runs", so it is an adverb.', 'MEDIUM', 4),

('Choose the sentence with the correct tense: ',
 'He go to school every day.',
 'He goes to school every day.',
 'He going to school every day.',
 'He gone to school every day.',
 'B', 'Third-person singular present takes "goes".', 'MEDIUM', 4),

('Which of the following is a preposition?',
 'Quickly', 'Beautiful', 'On', 'Run',
 'C', '"On" indicates position/relation, marking it a preposition.', 'EASY', 4);

-- ---------------- LOGICAL REASONING (subject_id = 5) ----------------
INSERT INTO mcq_bank (question, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty, subject_id) VALUES
('Find the next number in the series: 2, 4, 8, 16, ?',
 '20', '24', '32', '64',
 'C', 'Each term doubles the previous one: 16 * 2 = 32.', 'EASY', 5),

('Complete the analogy — Book : Read :: Food : ?',
 'Cook', 'Buy', 'Eat', 'Smell',
 'C', 'A book is meant to be read; food is meant to be eaten.', 'EASY', 5),

('Find the next letter: A, C, E, G, ?',
 'H', 'I', 'J', 'K',
 'B', 'The pattern skips one letter each time, so after G comes I.', 'EASY', 5),

('Which number is the odd one out: 3, 5, 7, 9, 11?',
 '3', '5', '9', '11',
 'C', 'All others are prime; 9 = 3 * 3 is composite.', 'MEDIUM', 5),

('If all roses are flowers and some flowers fade quickly, then which conclusion follows?',
 'All roses fade quickly.',
 'No roses fade quickly.',
 'Some roses may fade quickly.',
 'All flowers are roses.',
 'C', 'Only a possibility statement is logically warranted by the premises.', 'MEDIUM', 5),

('A is the brother of B. B is the sister of C. C is the father of D. How is A related to D?',
 'Father', 'Uncle', 'Brother', 'Cousin',
 'B', 'A is a sibling of D''s parent C, hence A is D''s uncle.', 'HARD', 5);
