import { LiteratureSectionInfo } from '../types';

export const PRIDE_AND_PREJUDICE_SECTIONS: LiteratureSectionInfo[] = [
  {
    sectionNumber: 1,
    title: "Section 1: The New Arrival at Netherfield",
    titleAr: "القسم الأول: وصول الجار الجديد إلى نيذر فيلد",
    bookPages: "Student's Book p. 100–101 / Activity Book p. 168–169",
    storySoFarEn: "The novel opens with what was then considered a universal truth – that a single rich man must be looking for a wife. When such a man arrives in a new place, no matter what his feelings may be, some mothers may feel that their own daughters deserve to marry him more than most. Mr and Mrs Bennet talk of a new arrival – the estate of Netherfield Park has been taken by a young man from a rich background, who moved from the north of England, by the name of Mr Bingley.",
    storySoFarAr: "تفتتح الرواية بحقيقة كانت تعد من المسلمات: أن أي رجل أعزب وثرى لا بد أنه يبحث عن زوجة. وعندما يحل هذا الرجل بمكان جديد، تشعر الأمهات أن بناتهن أحق بالزواج منه. يتحدث السيد والسيدة بينيت عن ساكن جديد استأجر ضيعة نيذر فيلد بارك، وهو شاب ثري من شمال إنجلترا يدعى السيد بينغلي.",
    extractOriginal: `‘What is his name?’, Mr. Bennet asked his wife.
‘Bingley’ replied Mrs. Bennet.
‘Is he married or single?’
‘Oh! Single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!’
‘What do you mean?’
‘My dear Mr. Bennet,’ replied his wife, ‘how can you be so tiring! You must know that I am thinking he could marry one of them.’
‘Is that his plan to live here?’
‘Plan! Nonsense, how can you think he would want to live here! But it is very likely that he may fall in love with one of our girls, and therefore you must visit him as soon as he comes.’
‘I see no reason for that. You and the girls may go, or you may send them by themselves, which perhaps will be even better, for as you are as beautiful as any of them. Mr. Bingley may like you the best of them all.’
‘My dear, you flatter me. I certainly have had my share of beauty, but I do not pretend to be anything extraordinary now. When a woman has five grown-up daughters, she ought to give up thinking of her own beauty.’
‘Well, that is because our other daughters are all silly and ignorant, like other girls,’ Mr. Bennet replied; ‘but Lizzy is quicker than her sisters.’
‘Mr. Bennet, how can you speak of your own children in such a way? You have no sympathy for my poor nerves.’
‘You are wrong, my dear. I have a high respect for your nerves. They are my old friends. I have heard you mention them a lot these last twenty years at least.’`,
    extractAr: `سأل السيد بينيت زوجته: "ما اسمه؟"
أجابت السيدة بينيت: "بينغلي".
"هل هو متزوج أم أعزب؟"
"أوه! أعزب يا عزيزي بكل تأكيد! رجل أعزب ذو ثروة طائلة؛ أربعة أو خمسة آلاف في السنة. يا له من أمر رائع لبناتنا!"
"ماذا تقصدين؟"
أجابت زوجته: "عزيزي السيد بينيت، كيف يمكنك أن تكون متعباً إلى هذا الحد! يجب أن تعلم أنني أفكر في أنه قد يتزوج إحداهن."
"هل خطته أن يعيش هنا؟"
"خطة! هراء، كيف تعتقد أنه يريد العيش هنا! ولكن من المحتمل جداً أن يقع في حب إحدى فتياتنا، ولذلك يجب أن تزوره بمجرد وصوله."
"أنا لا أرى أي سبب لذلك. يمكنك الذهاب أنت والفتيات، أو يمكنك إرسالهن بمفردهن، وهو ما قد يكون أفضل، فبما أنك جميلة مثل أي منهن، فقد يفضلك السيد بينغلي عليهن جميعهن."
"عزيزي، أنت تجاملني. بالتأكيد كان لي نصيبي من الجمال، لكنني لا أدعي أنني شيء استثنائي الآن. عندما يكون للمرأة خمس بنات بالغات، ينبغي أن تكف عن التفكير في جمالها."
أجاب السيد بينيت: "حسناً، هذا لأن بناتنا الأخريات جميعهن سخيفات وجاهلات مثل بقية الفتيات، لكن ليزي (إليزابيث) أذكى وأسرع بديهة من أخواتها."
"سيد بينيت، كيف تتحدث عن أطفالك بهذه الطريقة؟ ليس لديك أي تعاطف مع أعصابي المسكينة."
"أنت مخطئة يا عزيزتي. أنا أحترم أعصابك كثيراً، فهي صديقتي القديمة، لقد سمعتك تذكرينها طوال العشرين عاماً الماضية على الأقل."`,
    glossary: [
      { word: "nonsense", pos: "n", meaningEn: "something silly, crazy", meaningAr: "هراء / كلام فارغ وسخيف" },
      { word: "flatter", pos: "v", meaningEn: "to compliment something or someone", meaningAr: "يجامل / يطري" },
      { word: "share", pos: "n", meaningEn: "the amount of something that is acceptable for one person", meaningAr: "نصيب / حصة" },
      { word: "newcomers", pos: "n", meaningEn: "people who are new to a place", meaningAr: "قادمون جدد" },
      { word: "ignorant", pos: "adj", meaningEn: "someone who is not educated or does not know much", meaningAr: "جاهل / قليل المعرفة" },
      { word: "sympathy", pos: "n", meaningEn: "understanding someone’s feelings", meaningAr: "تعاطف / تفهم للمشاعر" }
    ],
    exercises: [
      {
        type: "tf",
        question: "Mr Bingley is looking to live in the Bennets' estate.",
        questionAr: "السيد بينغلي يتطلع للعيش في ضيعة عائلة بينيت.",
        answer: "False (He leased the neighbouring estate of Netherfield Park)",
        answerAr: "خطأ (استأجر ضيعة نيذر فيلد المجاورة وليس ضيعة بينيت)"
      },
      {
        type: "tf",
        question: "Mrs Bennet thinks Mr Bennet prefers Lizzy over their other daughters.",
        questionAr: "السيدة بينيت تعتقد أن زوجها يفضل ليزي على بناتهما الأخريات.",
        answer: "True (She complains he is always giving her the preference)",
        answerAr: "صح (تعاتبه قائلة: أنت دائماً تعطيها الأفضلية)"
      },
      {
        type: "qa",
        question: "How much money does Mr Bingley earn yearly?",
        questionAr: "كم يبلغ دخل السيد بينغلي السنوي؟",
        answer: "Four or five thousand pounds a year (£4,000–£5,000).",
        answerAr: "أربعة أو خمسة آلاف جنيه إسترليني سنوياً."
      },
      {
        type: "qa",
        question: "Why does Mr Bennet think Lizzy is different from her sisters?",
        questionAr: "لماذا يرى السيد بينيت أن ليزي تختلف عن أخواتها؟",
        answer: "Because she is quicker and has more wit than her sisters, whom he considers silly and ignorant.",
        answerAr: "لأنها أسرع بديهة وأكثر ذكاءً من أخواتها اللواتي يراهن سخيفات وجاهلات."
      },
      {
        type: "vocab",
        question: "Find words from the text: a large amount of money = f_______ ; adult = g_______-u___ ; unfairly treating one person better = p_______",
        questionAr: "استخرج من النص: ثروة كبيرة = f... ؛ بالغ = g...-u... ؛ تفضيل ومحاباة = p...",
        answer: "fortune | grown-up | preference",
        answerAr: "fortune (ثروة) | grown-up (بالغ) | preference (تفضيل)"
      }
    ]
  },
  {
    sectionNumber: 2,
    title: "Section 2: The Netherfield Ball & Darcy's Insult",
    titleAr: "القسم الثاني: حفلة نيذر فيلد الراقصة وإهانة دارسي",
    bookPages: "Student's Book p. 102–103 / Activity Book p. 170–171",
    storySoFarEn: "Mrs Bennet is angry at her husband for thinking he shouldn’t have to visit Mr Bingley. The sisters find out that Mr Bennet had actually visited him that morning. Bingley then brings his sisters, brother-in-law, and best friend Mr Darcy to a ball. While Bingley is charmed by Jane and dances with her twice, Darcy refuses to dance with Elizabeth, uttering an insult loud enough for her to overhear.",
    storySoFarAr: "يكتشف الجميع أن السيد بينيت زار بينغلي صباحاً بالفعل. يحضر بينغلي مع شقيقتيه وصهره وصديقه المقرب السيد دارسي حفلة راقصة. يفتتن بينغلي بجين ويرقص معها مرتين، بينما يرفض دارسي الرقص مع إليزابيث مطلقاً تعليقاً فظاً يسمعه الجميع.",
    extractOriginal: `‘Come, Darcy,’ said Mr. Bingley, ‘I must have you dance. I hate to see you standing about by yourself in this stupid way. You had much better dance.’
‘I certainly will not. You know how I hate it unless I know my partner very well. At such a party as this, it would be horrible. Your sisters are engaged, and there is not another woman in the room whom I would like to stand up with.’
‘I would not be as picky as you are,’ cried Mr. Bingley, ‘for a kingdom! I swear I have never met with so many lovely girls in my life as I have this evening; and several of them are very pretty.’
‘You are dancing with the only beautiful girl in the room,’ said Mr. Darcy, looking at the eldest Miss Bennet.
‘Oh! She is the most beautiful creature I have ever seen! But there is one of her sisters sitting down just behind you who is very pretty. Do let me ask my partner to introduce you.’
‘Which do you mean?’ and turning round he looked for a moment at Elizabeth. When he caught her eye, Mr. Darcy looked away and coldly said: ‘She is pleasant but not beautiful enough for me; I am in no mood at the moment to give attention to young ladies who are ignored by other men. You had better return to your partner and enjoy her smiles, for you are wasting your time with me.’
Mr. Bingley followed his advice. Mr. Darcy walked off; and Elizabeth remained with no very friendly feelings toward him. She told the story, however, laughing with her friends; for she had a lively, playful manner and found ridiculous things like this very funny.`,
    extractAr: `قال السيد بينغلي: "هيا يا دارسي، يجب أن ترقص. أكره رؤيتك تقف وحيداً بهذه الطريقة الغبية. من الأفضل لك أن ترقص."
أجاب دارسي: "بالتأكيد لن أفعل. أنت تعلم كم أمقت الرقص ما لم أكن أعرف شريكتي جيداً. في مثل هذه الحفلة، سيكون الأمر فظيعاً. شقيقتاك مرتبطتان بالرقص، ولا توجد امرأة أخرى في القاعة أرغب بمشاركتها."
صاح بينغلي: "لن أكون متطلباً مثلك ولو أعطيت ملكاً! أقسم أنني لم أرَ فتيات جميلات في حياتي مثل هذا المساء."
قال دارسي ناظراً إلى الآنسة بينيت الكبرى (جين): "أنت ترقص مع الفتاة الجميلة الوحيدة في القاعة."
"أوه! إنها أجمل مخلوق رأيته! لكن هناك إحدى أخواتها تجلس خلفك مباشرة وهي حسناء جداً. دعني أطلب من شريكتي أن تعرفك بها."
"أي واحدة تقصد؟" والتفت ونظر لحظة إلى إليزابيث، وحين التقت أعينهما، أشاح دارسي بنظره وقال ببرود: "إنها مقبولة لكنها ليست جميلة بما يكفي لتغريني؛ ولست في مزاج حالياً للاهتمام بفتيات يتجاهلهن بقية الرجال. من الأفضل أن تعود لشريكتك وتستمتع بابتساماتها، فأنت تضيع وقتك معي."
ابتعد دارسي، وبقيت إليزابيث بمشاعر غير ودية تجاهه، لكنها روت الحكاية ضاحكة مع صديقاتها؛ لأنها ذات روح مرحة وتجد هذه السخافات مضحكة جداً.`,
    glossary: [
      { word: "picky", pos: "adj", meaningEn: "someone who is hard to please", meaningAr: "صعب الإرضاء / متطلب" },
      { word: "swear", pos: "v", meaningEn: "be sure of something", meaningAr: "يقسم / يؤكد بيقين" },
      { word: "dare", pos: "v", meaningEn: "be brave enough to say something", meaningAr: "يجرؤ على القول" },
      { word: "pleasant", pos: "adj", meaningEn: "nice, attractive", meaningAr: "لطيفة / مقبولة" },
      { word: "ridiculous", pos: "adj", meaningEn: "crazy, silly", meaningAr: "سخيف / مضحك لدرجة الهراء" },
      { word: "charming", pos: "adj", meaningEn: "very attractive/nice", meaningAr: "ساحر / فتان" },
      { word: "gown", pos: "n", meaningEn: "an outfit, usually a dress", meaningAr: "فستان سهرة رسمي" },
      { word: "conceited", pos: "adj", meaningEn: "with a very high opinion of oneself", meaningAr: "مغرور / معجب بنفسه" }
    ],
    exercises: [
      {
        type: "tf",
        question: "Mr Bingley thinks Mr Darcy is too difficult to please.",
        questionAr: "السيد بينغلي يرى أن السيد دارسي صعب الإرضاء.",
        answer: "True (He calls him picky)",
        answerAr: "صح (يصفه بأنه متطلب وصعب الإرضاء)"
      },
      {
        type: "tf",
        question: "Mr Darcy thinks Elizabeth is the only beautiful girl in the room.",
        questionAr: "السيد دارسي يرى أن إليزابيث هي الفتاة الجميلة الوحيدة بالقاعة.",
        answer: "False (He said that Jane Bennet was the only beautiful girl)",
        answerAr: "خطأ (قال إن أختها جين هي الجميلة الوحيدة)"
      },
      {
        type: "qa",
        question: "How did Elizabeth react to Mr Darcy's rude comment?",
        questionAr: "كيف كان رد فعل إليزابيث على تعليق دارسي الفظ؟",
        answer: "She found it funny and laughed about it with her friends because of her lively, playful nature.",
        answerAr: "وجدته أمراً مضحكاً وروته وهي تضحك مع صديقاتها لروحها المرحة اللطيفة."
      },
      {
        type: "matching",
        question: "Who danced with Jane twice? / Who thought the ball was a waste of time?",
        questionAr: "من رقص مع جين مرتين؟ / ومن اعتبر الحفلة مضيعة للوقت؟",
        answer: "Mr Bingley danced with Jane twice | Mr Darcy thought the ball was a waste of time",
        answerAr: "السيد بينغلي رقص مع جين مرتين | السيد دارسي اعتبر الحفلة مضيعة للوقت"
      }
    ]
  },
  {
    sectionNumber: 3,
    title: "Section 3: Elizabeth's Walk in the Mud to Netherfield",
    titleAr: "القسم الثالث: مسيرة إليزابيث بالوحل لعيادة أختها المريضة",
    bookPages: "Student's Book p. 104–105 / Activity Book p. 172–173",
    storySoFarEn: "Jane visits Netherfield, gets caught in a rainstorm, and falls seriously ill. Hearing this, Elizabeth walks three miles through mud and dirt to be with her sister. Caroline Bingley and Louisa Hurst mock Elizabeth's appearance behind her back, while Bingley praises her devotion and Darcy defends her brightened eyes.",
    storySoFarAr: "تمرض جين في نيذر فيلد إثر عاصفة ممطرة. تسير إليزابيث ثلاثة أميال في الوحل لتعتني بأختها. تسخر كارولين بينغلي ولويزا هيرست من ملابسها المتسخة بالوحل ووحشية مظهرها، بينما يمتدح بينغلي حبها لأختها ويدافع دارسي عن بريق عينيها الجميلتين.",
    extractOriginal: `When dinner was over, Elizabeth returned directly to Jane, and Caroline began talking badly about her as soon as she was out of the room. Her manners were declared to be very bad indeed, a mixture of pride and lack of respect; she had no conversation, no style, no beauty. Mrs. Hurst thought the same, and added:
‘She has nothing, in short, to recommend her, apart from being an excellent walker. I shall never forget her appearance this morning. She really looked almost wild,’ said Caroline, ‘Very silly to come at all! Why must she be walking about the country because her sister had a cold? Her hair, so untidy!’
‘Yes, and her petticoat; I hope you saw her petticoat,’ said Louisa, ‘six inches deep in mud, I am absolutely certain; and the gown which had been let down to hide it not doing its job.’
‘Your picture may be very exact, Louisa,’ said Bingley; ‘but I did not care about any of that. I thought Miss Elizabeth Bennet looked remarkably well when she came into the room this morning. Her dirty petticoat quite escaped my notice.’
‘I am afraid, Mr. Darcy,’ observed Caroline in a half whisper, ‘that this adventure has rather affected your admiration of her fine eyes.’
‘Not at all,’ he replied; ‘they were brightened by it.’`,
    extractAr: `بعد انتهاء العشاء، عادت إليزابيث مباشرة إلى جين، وبدأت كارولين تتحدث عنها بسوء بمجرد خروجها من الغرفة. وصفت تصرفاتها بأنها سيئة للغاية ومزيج من الكبرياء وقلة الاحترام؛ بلا أسلوب ولا جمال. وأضافت السيدة هيرست:
"ليس فيها باختصار ما يشفع لها سوى أنها مشاءة ممتازة! لن أنسى مظهرها هذا الصباح؛ بدت متوحشة تقريباً! كم هو تصرف أحمق أن تأتي سيراً على الأقدام لأن أختها أصيبت بزكام! وشعرها غير مرتب إطلاقاً!"
قالت لويزا: "نعم، وتنورتها الداخلية، آمل أنكم رأيتم تنورتها، كانت مغمورة بست بوصات من الوحل، وأنا متأكدة من ذلك تماماً!"
أجاب بينغلي: "قد يكون وصفك دقيقاً يا لويزا، لكنني لم أهتم بأي من ذلك. بدت لي الآنسة إليزابيث في غاية التألق حين دخلت الغرفة، وتنورتها الملطخة بالوحل فاتتني ملاحظتها تماماً."
همست كارولين لدارسي: "أخشى يا سيد دارسي أن هذه المغامرة قد أثرت سلباً على إعجابك بعينيها الجميلتين."
أجابها دارسي فوراً: "على الإطلاق؛ بل أشرقتا وازدادتا بريقاً بسببها."`,
    glossary: [
      { word: "intruder", pos: "n", meaningEn: "a stranger who wasn’t invited", meaningAr: "دخيل / غير مدعو" },
      { word: "petticoat", pos: "n", meaningEn: "clothing used underneath a skirt", meaningAr: "تنورة داخلية نسائية" },
      { word: "inches", pos: "n", meaningEn: "a unit to measure length or height", meaningAr: "بوصات (إنش)" },
      { word: "half whisper", pos: "n", meaningEn: "said in a low voice but loud enough to hear", meaningAr: "نصف همسة مسموعة" },
      { word: "brightened", pos: "v", meaningEn: "to become lighter, happier, more radiant", meaningAr: "أشرقت / تلألأت" },
      { word: "have regard for", pos: "v", meaningEn: "have great respect for", meaningAr: "يكن تقديراً واحتراماً كبيراً" }
    ],
    exercises: [
      {
        type: "qa",
        question: "Why does Louisa call Elizabeth 'an excellent walker'?",
        questionAr: "لماذا تصف لويزا إليزابيث بأنها 'مشاءة ممتازة' بتهكم؟",
        answer: "Sardonically because Elizabeth walked three miles through fields and mud to visit her sick sister.",
        answerAr: "بتهكم وسخرية لأن إليزابيث مشت 3 أميال عبر الحقول والوحل لزيارة أختها المريضة."
      },
      {
        type: "qa",
        question: "What did Mr Darcy reply when Caroline asked if the walk affected his admiration of Elizabeth's fine eyes?",
        questionAr: "بماذا أجاب دارسي عندما سألته كارولين إن كان مشيها في الوحل أضعف إعجابه بعينيها الجميلتين؟",
        answer: "He replied: 'Not at all; they were brightened by it.'",
        answerAr: "أجابها: 'على الإطلاق؛ بل أشرقتا وتألقتا بفضل ذلك المشي.'"
      },
      {
        type: "vocab",
        question: "Vocabulary match: fear = a_______ ; messy = u_______ ; not caring = i_______",
        questionAr: "مرادفات: خوف = a... ؛ غير مرتب = u... ؛ لا مبالاة = i...",
        answer: "anxiety | untidy | indifference",
        answerAr: "anxiety (قلق وخوف) | untidy (غير مرتب) | indifference (لا مبالاة)"
      }
    ]
  },
  {
    sectionNumber: 4,
    title: "Section 4: Mr Wickham's False Revelations",
    titleAr: "القسم الرابع: افتراءات ويكهام المزيفة ضد دارسي",
    bookPages: "Student's Book p. 106–107 / Activity Book p. 174–175",
    storySoFarEn: "Mr Collins visits looking for a wife. Bennet sisters meet officers Mr Denny and Mr Wickham. At a family dinner party, Elizabeth and Wickham speak privately. Wickham invents a tale that the late Mr Darcy left him a handsome bequest, but young Darcy cheated him out of it due to jealousy.",
    storySoFarAr: "يصل القس كولينز باحثاً عن زوجة. تلتقي الفتيات بالضابطين ديني وويكهام. يتحدث ويكهام على انفراد مع إليزابيث ويدعي كذباً أن والد دارسي أوصى له بإرث وفير، لكن دارسي الابن حرمه منه بدافع الغيرة والحسد.",
    extractOriginal: `‘Yes – the late Mr. Darcy left me enough to live more than a comfortable life in his gift. He was my godfather, and very attached to me. He meant to provide for me; but when he died, it was given to someone else,’ said Mr. Wickham.
‘Good heavens!’ cried Elizabeth; ‘but how could that be? How could his will be ignored? Why did you not look for legal advice?’
‘There was just such an informality in the terms of the bequest as to give me no hope from law. A man of honour could not have doubted the intention, but Mr. Darcy chose to doubt it... The fact is that we are very different sorts of men, and that he hates me.’
‘This is quite shocking! He deserves to be disgraced in public.’
‘Some time or other he will be – but it shall not be by me. Till I can forget his father, I can never expose him.’
Elizabeth honoured him for such feelings and thought him handsomer than ever as he expressed them.`,
    extractAr: `قال السيد ويكهام: "نعم، لقد ترك لي السيد دارسي الراحل ما يكفي لأعيش حياة أكثر من مريحة كعطية في وصيته؛ فقد كان عرّابي وشديد التعلق بي. لكن حين توفي، أُعطي الإرث لشخص آخر."
صاحت إليزابيث: "يا إلهي! كيف يمكن تجاهل وصيته؟ لماذا لم تطلب استشارة قانونية؟"
"كان هناك ثغرة شكلية في صياغة الوصية حرمتني من اللجوء للقانون. رجل الشرف ما كان ليشُك في النوايا، لكن السيد دارسي اختار التشكيك فيها... الحقيقة أننا رجلان من طينتين مختلفتين، وأنه يكرهني."
"هذا أمر صادم للغاية! إنه يستحق أن يُفضح ويُهان علناً!"
"في وقت ما سيفضح، لكن ليس على يدي؛ فحتى أنسى والده العظيم، لن أفضحه أبداً."
أكبرت إليزابيث فيه هذه المشاعر ورأته أوسم من أي وقت مضى وهو يعبر عنها.`,
    glossary: [
      { word: "godfather", pos: "n", meaningEn: "a man who promised to take care of a child", meaningAr: "العراب / الكفيل الروحي" },
      { word: "bequest", pos: "n", meaningEn: "money or property given at the request of a dying person", meaningAr: "وصية مالية / إرث موصى به" },
      { word: "disgraced", pos: "adj", meaningEn: "someone who lost the respect of others", meaningAr: "مفضوح / ساقط الهيبة" },
      { word: "motivation", pos: "n", meaningEn: "the reason for doing something", meaningAr: "الدافع / الباعث" },
      { word: "resentments", pos: "n", meaningEn: "feeling angry at something unfair", meaningAr: "الضغائن والمشاعر السلبية" },
      { word: "vouch for", pos: "phr v", meaningEn: "show or confirm truth of something", meaningAr: "يشهد لـ / يؤكد صدق" }
    ],
    exercises: [
      {
        type: "tf",
        question: "Mr Darcy's father did not leave anything for his godson in Wickham's claim.",
        questionAr: "والد دارسي لم يترك أي شيء لعرابه ويكهام حسب ادعاء الأخير.",
        answer: "False (Wickham claimed he left him enough to live comfortably)",
        answerAr: "خطأ (ادعى ويكهام أن الوالد ترك له إرثاً كافياً للعيش برغد)"
      },
      {
        type: "tf",
        question: "Elizabeth did not think Mr Darcy could be so cruel.",
        questionAr: "لم تكن إليزابيث تظن أن دارسي يمكن أن يكون بهذه القسوة.",
        answer: "True (She did not suspect him of such malicious revenge)",
        answerAr: "صح (لم تشك بأنه قادر على هذا الانتقام الخبيث)"
      },
      {
        type: "qa",
        question: "Why didn't Mr Wickham disgrace Mr Darcy publicly?",
        questionAr: "لماذا زعم ويكهام أنه لا يريد فضح دارسي علناً؟",
        answer: "Because he respected and loved Darcy's late father and refused to expose his son out of gratitude to him.",
        answerAr: "احتراماً وتقديراً لذكرى والد دارسي الراحل وعرفاناً بجميله."
      }
    ]
  },
  {
    sectionNumber: 5,
    title: "Section 5: Darcy's First Proposal & Elizabeth's Fierce Rejection",
    titleAr: "القسم الخامس: عرض زواج دارسي الأول ورفض إليزابيث الصارم",
    bookPages: "Student's Book p. 108–109 / Activity Book p. 176–177",
    storySoFarEn: "Elizabeth travels to the countryside to visit Charlotte and Mr Collins. There, she encounters Darcy visiting his aunt Lady Catherine de Bourgh. Learning from Fitzwilliam that Darcy separated Bingley and Jane, Elizabeth is alone and furious when Darcy arrives unexpectedly and proposes, but insults her poverty and inferior connections.",
    storySoFarAr: "تسافر إليزابيث لزيارة شارلوت وتلتقي بدارسي لدى خالته الليدي كاثرين. بعد معرفتها أنه فرق بين بينغلي وأختها جين، يدخل دارسي ويطلب يدها للزواج لكنه يهين فقر عائلتها وضعة نسبها، فترفضه إليزابيث بغضب شديد.",
    extractOriginal: `‘And of course, you had no right to interfere with any relations between my sister and Mr. Bingley... Your character was revealed in the recital which I received many months ago from Mr. Wickham... You have reduced him to his present state of poverty.’
‘And this,’ cried Darcy, ‘is your opinion of me! My faults, according to this calculation, are heavy indeed! But perhaps these offences might have been overlooked, had not your pride been hurt by my honest confession of the feelings that had long prevented my forming any serious arrangement... Could you expect me to be happy about the inferiority of your connections? – to congratulate myself on the hope of relations, whose condition in life is so surely beneath my own?’
Elizabeth felt herself growing more angry every moment: ‘You could not have made the offer of your hand in any possible way that would have made me accept it... From the very beginning, your manners impressed me with your arrogance and selfish lack of respect... I had not known you a month before I felt that you were the last man in the world whom I could ever be persuaded to marry.’
‘You have said quite enough, madam. I perfectly understand your feelings and have now only to be ashamed of what my own have been.’`,
    extractAr: `صاحت إليزابيث: "لم يكن لك أي حق في التدخل للتفريق بين أختي وبينغلي... لقد انكشفت حقيقتك في الرواية التي سمعتها من ويكهام؛ لقد أنزلته إلى حالة الفقر التي هو فيها!"
صاح دارسي: "وهذا هو رأيك بي! أخطائي بحسابك هذا ثقيلة حقاً! لكن ربما كانت هذه الإساءات ستُغتفر لولا أن كبرياءك قد جُرح باعترافي الصادق بالمشاعر التي منعتني طويلاً من التقدم... هل كنتِ تتوقعين مني أن أبتهج بضعة أصل عائلتك ومكانتها التي هي أدنى بكثير من مكانتي؟"
ردت إليزابيث بغضب متصاعد: "لم يكن بإمكانك تقديم عرض زواجك بأي طريقة في العالم تجعلني أقبله... منذ البداية، رسخت تصرفاتك في نفسي يقيناً بغطرستك وازدرائك الأناني لمشاعر الآخرين... لم يمضِ شهر على معرفتي بك حتى شعرت بأنك آخر رجل في العالم يمكن إقناعي بالزواج منه!"
أجاب دارسي: "لقد قلتِ ما يكفي يا سيدتي. أفهم مشاعرك تماماً، وليس أمامي الآن إلا أن أخجل من مشاعري أنا."`,
    glossary: [
      { word: "overlook", pos: "v", meaningEn: "ignore, not notice something", meaningAr: "يتغاضى عن / يتجاهل" },
      { word: "inclination", pos: "n", meaningEn: "the feeling of wanting to do something", meaningAr: "ميل / رغبة صادقة" },
      { word: "gentlemanlike", pos: "adj", meaningEn: "very good, polite behaviour", meaningAr: "سلوك مهذب ونبيل" },
      { word: "acquaintance", pos: "n", meaningEn: "knowing somebody", meaningAr: "معرفة شخصية" },
      { word: "foundation", pos: "n", meaningEn: "the beginning of something", meaningAr: "أساس / قاعدة" }
    ],
    exercises: [
      {
        type: "tf",
        question: "Elizabeth found Mr Darcy to be rude from the moment they met.",
        questionAr: "وجدت إليزابيث أن دارسي كان فظاً منذ اللحظة الأولى للقائهما.",
        answer: "True (From the first moment of their acquaintance)",
        answerAr: "صح (منذ اللحظة الأولى لتعارفهما)"
      },
      {
        type: "qa",
        question: "What famous sentence did Elizabeth say to reject Darcy's proposal?",
        questionAr: "ما هي الجملة الشهيرة التي نطقت بها إليزابيث لرفض طلب دارسي؟",
        answer: "'You were the last man in the world whom I could ever be persuaded to marry.'",
        answerAr: "'كنت آخر رجل في العالم يمكن إقناعي بالزواج منه.'"
      },
      {
        type: "qa",
        question: "What two main accusations did Elizabeth level against Darcy?",
        questionAr: "ما هما الاتهامان الرئيسيان اللذان وجهتهما إليزابيث لدارسي؟",
        answer: "Ruining her sister Jane's happiness with Bingley, and ruining Mr Wickham's life and inheritance.",
        answerAr: "تحطيم سعادة أختها جين مع بينغلي، وتدمير حياة ويكهام وحرمانه من إرثه."
      }
    ]
  },
  {
    sectionNumber: 6,
    title: "Section 6: Truth, Forgiveness & The Happy Engagement",
    titleAr: "القسم السادس: انكشاف الحقيقة، التسامح، والخطوبة السعيدة",
    bookPages: "Student's Book p. 110–111 / Activity Book p. 178–179",
    storySoFarEn: "Darcy writes a letter revealing Wickham's deceit and Georgiana's near seduction. Lydia elopes with Wickham, and Darcy secretly pays Wickham's debts and secures their wedding. Lady Catherine visits Elizabeth demanding she renounce Darcy, but Elizabeth refuses. Darcy returns, discovers her change of heart, proposes again, and they get engaged.",
    storySoFarAr: "يسلم دارسي إليزابيث رسالة تكشف حقيقة ويكهام ومحاولته التغرير بجورجيانا. تهرب ليديا مع ويكهام، ويتدخل دارسي سراً ليدفع ديونه ويزوجهما لحماية شرف العائلة. تقتحم الليدي كاثرين بيت بينيت لتمنع إليزابيث من الزواج بدارسي فترفض إليزابيث الخضوع لها. يعلم دارسي فيطلب يدها مجدداً وتقبل بحب وامتنان.",
    extractOriginal: `‘You are too generous to play with me. If your feelings are still what they were last April, tell me so at once. My love and wishes are still the same, but one word from you will silence me on this subject for ever,’ said Mr. Darcy.
Elizabeth, feeling all the more than common embarrassment of his situation, now forced herself to speak; and immediately, though not very fluently, gave him to understand that her feelings had gone through such a change... as to make her receive with gratitude and pleasure his present assurances.
The happiness which this reply produced was such as he had probably never felt before...
‘It taught me to hope,’ said he, ‘as I had barely ever allowed myself to hope before. I knew enough of your feelings to be certain that, had you been absolutely decided against me, you would have acknowledged it to Lady Catherine, sincerely and openly.’
‘We will not argue for the biggest share of blame about that evening,’ said Elizabeth. ‘The behaviour of neither, if examined carefully, was correct; but since then, we have both, I hope, improved.’`,
    extractAr: `قال السيد دارسي: "أنتِ أكرم من أن تتلاعبي بمشاعري. إذا كانت مشاعرك ما تزال كما كانت في نيسان الماضي، فأخبريني بذلك فوراً. إن حبي وأمنياتي لم تتغير، لكن كلمة واحدة منك ستخرسني في هذا الموضوع إلى الأبد."
أجبرت إليزابيث نفسها على الكلام وسط حرج شديد، وأفهمته في الحال أن مشاعرها قد مرت بتحول جذري، جعلها تستقبل تأكيداته الحالية بامتنان وسرور غامرين.
كانت السعادة التي أحدثها جوابها أعظم مما شعر به في حياته قط.
قال دارسي: "لقد علمني موقفك أن آمل، وكنت أعلم أنك لو كنتِ حاسمة في رفضك لكنتِ صرحتِ بذلك لليدي كاثرين بصدق وعلانية."
قالت إليزابيث: "لن نتجادل حول من يحمل النصيب الأكبر من اللوم في تلك الليلة؛ فتصرف كلانا لم يكن صائباً، ولكن منذ ذلك الحين، أعتقد أننا كلينا قد نضجنا وتحسنا."`,
    glossary: [
      { word: "inn", pos: "n", meaningEn: "a country pub that provides accommodation", meaningAr: "نُزل ريفي / فندق صغير" },
      { word: "embarrassment", pos: "n", meaningEn: "feeling shy, guilty", meaningAr: "إحراج / خجل" },
      { word: "gratitude", pos: "n", meaningEn: "wanting to express your thanks to someone", meaningAr: "امتنان / عرفان بالجميل" },
      { word: "assurance", pos: "n", meaningEn: "something that someone is sure of", meaningAr: "تأكيد / طمأنة" },
      { word: "accusations", pos: "n", meaningEn: "saying someone did something without proof", meaningAr: "اتهامات" },
      { word: "disapproval", pos: "n", meaningEn: "not liking someone’s behaviour", meaningAr: "استنكار / عدم الرضا" }
    ],
    exercises: [
      {
        type: "qa",
        question: "How did Lady Catherine's hostile visit make Darcy feel?",
        questionAr: "ما الشعور الذي منحته زيارة الليدي كاثرين المتغطرسة لدارسي؟",
        answer: "It taught him to hope, because Elizabeth refused to promise never to marry him.",
        answerAr: "منحته الأمل والتفاؤل، لأن إليزابيث رفضت أن تعد خالته بعدم الزواج منه أبداً."
      },
      {
        type: "qa",
        question: "Who does Elizabeth feel is to blame for their past arguments?",
        questionAr: "من ترى إليزابيث أنه يستحق اللوم على خلافاتهما السابقة؟",
        answer: "She said neither behaviour was correct, but both have improved since then.",
        answerAr: "رأت أن تصرف كليهما لم يكن صحيحاً، لكنهما كلاهما قد تحسنا وتطورا."
      }
    ]
  }
];

export const AS_YOU_LIKE_IT_SECTIONS: LiteratureSectionInfo[] = [
  {
    sectionNumber: 1,
    title: "Section 1: Act 1, Scene 1 – Brotherly Discord & Wrestling Plot",
    titleAr: "القسم الأول: الفصل الأول، المشهد الأول – نزاع الأخوين ومؤامرة المصارعة",
    bookPages: "Student's Book p. 114–115 / Activity Book p. 180–181",
    storySoFarEn: "Sir Rowland de Boys died leaving two sons, Orlando and Oliver. Oliver receives the inheritance and refuses to educate Orlando. Orlando complains to a servant and confronts Oliver, grabbing him by the throat. Oliver calls court wrestler Charles, who reveals Duke Senior was usurped by Duke Frederick and banished to the Forest of Arden. Oliver conspires with Charles to hurt or kill Orlando in the wrestling match.",
    storySoFarAr: "توفي السير رولاند تاركاً أوليفر وأورلاندو. استولى أوليفر على الإرث وحرم أورلاندو من التعليم. يتشاجر أورلاندو مع أوليفر ويمسكه من عنقه. يستدعي أوليفر المصارع تشارلز ويحرضه على كسر عنق أورلاندو في حلبة القصر والتخلص منه.",
    extractOriginal: `Oliver: Wilt thou lay hands on me, villain?
Orlando: I am no villain. I am the youngest son of Sir Rowland de Boys. He was my father, and he is thrice a villain that says such a father begot villains. Wert thou not my brother, I would not take this hand from thy throat till this other had pulled out thy tongue for saying so.
...
Oliver: Now will I stir this gamester. I hope I shall see an end of him, for my soul—yet I know not why—hates nothing more than he. Yet he’s gentle, never schooled and yet learned, full of noble device, of all sorts enchantingly beloved, and indeed so much in the heart of the world and especially of my own people, who best know him, that I am altogether misprized. But it shall not be so long; this wrestler shall clear all.`,
    extractModern: `Oliver: Are you going to put your hands on me, you villain?
Orlando: I’m no villain. I’m the youngest son of Sir Rowland de Boys. He was my father, and if anyone calls his sons villains, they are themselves three times a villain. If you weren’t my brother, I wouldn’t let go of your throat until I pulled your tongue out for saying this.
...
Oliver: Now I will cause trouble for my silly brother. I hope this will be the end of him. Even though I don’t know why, my soul hates him more than anything. He is a nice man. Even though he never went to school, he is very smart, and he is very noble. And everyone loves him, even my own people love him and hate me. But not for long; this wrestler will end him for me.`,
    extractAr: `أوليفر: أتمد يديك عليّ أيها النذل الشرير؟
أورلاندو: لست نذلاً! أنا الابن الأصغر للسير رولاند دي بويز. كان والدي، ومن يقول إن مثل هذا الأب ينجب أشراراً فهو شرير ثلاث مرات. لولا أنك أخي لما رفعت يدي عن عنقك حتى أقتلع لسانك بيدي الأخرى!
...
أوليفر (منفرداً): سأوقع أخي الأحمق في الشرك. آمل أن أرى نهايته؛ فروحي تمقته ولا أدري لماذا! إنه رجل نبيل وذكي رغم أنه لم يدخل مدرسة، والجميع يحبونه حتى أهل بيتي يحبونه ويبغضونني أنا. لكن هذا لن يدوم طويلاً، فهذا المصارع سينهي أمره بالكامل!`,
    glossary: [
      { word: "passing", pos: "n", meaningEn: "someone’s death", meaningAr: "وفاة / رحيل" },
      { word: "pursue", pos: "v", meaningEn: "to do something or go after something", meaningAr: "يتابع / يسعى وراء" },
      { word: "obey", pos: "v", meaningEn: "to do what someone tells you to", meaningAr: "يطيع" },
      { word: "villain", pos: "adj/n", meaningEn: "someone evil", meaningAr: "شرير / نذل" },
      { word: "noble", pos: "adj", meaningEn: "of honourable and honest nature", meaningAr: "نبيل وذو خلق رفيع" },
      { word: "soul", pos: "n", meaningEn: "one’s spirit", meaningAr: "روح / نفس" }
    ],
    exercises: [
      {
        type: "tf",
        question: "Oliver hates Orlando because Orlando is evil and rude.",
        questionAr: "أوليفر يكره أورلاندو لأن أورلاندو شرير وفظ.",
        answer: "False (He hates him out of jealousy because Orlando is noble, smart, and universally beloved)",
        answerAr: "خطأ (يكرهه بدافع الغيرة لأن أورلاندو شهم وذكي ومحبوب من الجميع)"
      },
      {
        type: "vocab",
        question: "Old English comparison: wilt thou = ________ ; thrice = ________ ; misprized = ________",
        questionAr: "مطابقة الإنجليزية القديمة: wilt thou = ... ؛ thrice = ... ؛ misprized = ...",
        answer: "are you going to | three times | unliked / despised",
        answerAr: "are you going to (هل أنت بصدد) | three times (ثلاث مرات) | unliked (ممقوت وغير محبوب)"
      }
    ]
  },
  {
    sectionNumber: 2,
    title: "Section 2: Act 2, Scenes 2 & 4 – Flight to Arden & Shepherd's Woes",
    titleAr: "القسم الثاني: الفصل الثاني – الهروب إلى آردن ولوعة الراعي سيلفيوس",
    bookPages: "Student's Book p. 116–117 / Activity Book p. 182–183",
    storySoFarEn: "Orlando wins the wrestling match. Rosalind and Orlando fall in love. Duke Frederick banishes Rosalind. Celia and Touchstone flee with her to the Forest of Arden. Rosalind disguises as Ganymede and Celia as Aliena. Frederick orders Oliver to find them. In the forest, they overhear young shepherd Silvius crying about his unrequited love for Phoebe.",
    storySoFarAr: "ينتصر أورلاندو على المصارع ويقع في حب روزاليند. ينفي فريدريك روزاليند فتهرب معها سيليا والمهرج تاتشستون إلى غابة آردن متنكرين (غانيميد وأليينا). في الغابة يستمعون للراعي سيلفيوس وهو يبكي حبه العاثر للراعية فيبي.",
    extractOriginal: `Silvius: O, thou didst then never love so heartily.
If thou rememb’rest not the slightest folly
That ever love did make thee run into,
Thou hast not loved.
Or if thou hast not sat as I do now,
Wearing thy hearer in thy mistress’ praise,
Thou hast not loved.
Or if thou hast not broke from company
Abruptly, as my passion now makes me,
Thou hast not loved.
O Phoebe, Phoebe, Phoebe!`,
    extractModern: `Silvius: Oh, then you haven’t really loved as much as I have. If you can’t remember even the smallest stupid thing love has ever made you do, then you haven’t loved. Or, if you haven’t sat like I am now, boring your listener with compliments of your beloved, then you haven’t loved. Or, if you haven’t left the company of others to be alone, as my passion now makes me do, then you haven’t loved. Oh, Phoebe, Phoebe, Phoebe!`,
    extractAr: `سيلفيوس: آه، إذاً أنت لم تحب قط من كل قلبك!
إن كنت لا تذكر أصغر حماقة دفعك الحب لارتكابها، فأنت لم تحب!
أو إن لم تجلس كما أجلس الآن، تصدع رأس سامعك بمديح معشوقتك، فأنت لم تحب!
أو إن لم تنفضّ عن رفاقك فجأة لتنفرد بلوعتك، كما يفعل بي الهوى الآن، فأنت لم تحب!
آه يا فيبي، فيبي، فيبي!`,
    glossary: [
      { word: "overheard", pos: "v", meaningEn: "to hear something you are not supposed to", meaningAr: "سمع خلسة / استرق السمع" },
      { word: "wherever", pos: "conj", meaningEn: "anywhere", meaningAr: "أينما / في أي مكان" },
      { word: "shepherd", pos: "n", meaningEn: "someone who takes care of sheep", meaningAr: "راعي غنم" },
      { word: "beloved", pos: "adj/n", meaningEn: "someone who is loved very much", meaningAr: "حبيبة / معشوقة" }
    ],
    exercises: [
      {
        type: "qa",
        question: "Why did Rosalind and Celia disguise themselves?",
        questionAr: "لماذا تنكرت روزاليند وسيليا؟",
        answer: "For their safety as young women travelling in the wild; Rosalind as a man (Ganymede) and Celia as a shepherdess (Aliena).",
        answerAr: "لحمايتهما كفتاتين مسافرتين في البرية؛ تنكرت روزاليند بزي فتى (غانيميد) وسيليا كراعية (أليينا)."
      },
      {
        type: "tf",
        question: "Silvius is desperately in love with Phoebe.",
        questionAr: "سيلفيوس هائم بحب فيبي بجنون.",
        answer: "True (He laments that no one has loved as passionately as him)",
        answerAr: "صح (يشكو من لوعته وعشقه الذي لا يضاهيه عشق)"
      }
    ]
  },
  {
    sectionNumber: 3,
    title: "Section 3: Act 3, Scene 2 – Love Poems on Trees & The Love Cure",
    titleAr: "القسم الثالث: الفصل الثالث – قصائد الحب على الأشجار وعلاج داء الهوى",
    bookPages: "Student's Book p. 118–119 / Activity Book p. 184–185",
    storySoFarEn: "Orlando and old servant Adam are welcomed by Duke Senior. Orlando runs through Arden hanging poems for Rosalind on every tree trunk. Rosalind (Ganymede) finds the poems, meets Orlando, and proposes a game: Orlando must come daily to Ganymede's cottage and woo Ganymede as if he were Rosalind to 'cure' his lovesickness.",
    storySoFarAr: "يستقبل الدوق الأكبر أورلاندو وخادمه آدم بحفاوة. يملأ أورلاندو الغابة بقصائد الغزل المعلقة على لحاء الأشجار. يعثر غانيميد (روزاليند) على القصائد ويلتقي بأورلاندو، فيعرض عليه زيارة كوخه يومياً والتغزل به كأنه روزاليند لتشفيته من جنون الحب.",
    extractOriginal: `Orlando:
O Rosalind, these trees shall be my books,
And in their barks my thoughts I’ll character,
That every eye which in this forest looks
Shall see thy virtue witnessed everywhere.
Run, run, Orlando, carve on every tree
The fair, the chaste, and unexpressive she.
...
Rosalind, as Ganymede: I would cure you if you would but call me Rosalind and come every day to my cote and woo me.
Orlando: Now, by the faith of my love, I will. Tell me where it is.`,
    extractModern: `Orlando:
Oh, Rosalind, these trees will be my books, and I will write my thoughts in their bark. This way, everyone who looks around this forest will see your beauty described everywhere. Run, run Orlando, write in every tree verses about the beautiful, the pure, the indescribable Rosalind.
...
Rosalind, as Ganymede: I could help you, but only if you would call me Rosalind and come to my cottage every day and pretend to court me.
Orlando: My love is so strong that I will do so. Tell me where the cottage is.`,
    extractAr: `أورلاندو:
يا روزاليند، ستكون هذه الأشجار دفاتري،
وعلى لحائها سأنقش خواطري وأشعاري،
حتى ترى كل عين تبصر في هذه الغابة
فضائلك وجمالك مسطوراً في كل مكان.
اركض يا أورلاندو وانقش على كل شجرة
أبياتاً في الفاتنة، الطاهرة، التي لا يصفها لسان!
...
غانيميد (روزاليند): أستطيع علاجك، ولكن بشرط أن تناديني روزاليند وتأتي إلى كوخي كل يوم لتتغزل بي.
أورلاندو: بصدق حبي سأفعل ذلك! أخبرني أين يقع كوخك!`,
    glossary: [
      { word: "verse", pos: "n", meaningEn: "lines from a poem", meaningAr: "أبيات شعرية" },
      { word: "indescribable", pos: "adj", meaningEn: "something that cannot be described by any words", meaningAr: "لا يوصف / فوق التعبير" },
      { word: "court", pos: "v", meaningEn: "try to please someone to get their affection/love", meaningAr: "يتودد إلى / يغازل" }
    ],
    exercises: [
      {
        type: "qa",
        question: "Why does Orlando carve poems on the tree barks in the forest?",
        questionAr: "لماذا ينقش أورلاندو القصائد على لحاء الأشجار؟",
        answer: "So that everyone who looks around the forest will see Rosalind's beauty and virtue described everywhere.",
        answerAr: "لكي يرى كل من ينظر في الغابة جمال وفضائل روزاليند مسطرة في كل مكان."
      },
      {
        type: "qa",
        question: "What is Ganymede's condition to help 'cure' Orlando of love?",
        questionAr: "ما هو شرط غانيميد ليساعد في 'علاج' أورلاندو من داء الحب؟",
        answer: "Orlando must call Ganymede 'Rosalind' and visit the cottage every day to pretend to court him.",
        answerAr: "أن ينادي غانيميد باسم روزاليند ويأتي إلى كوخه يومياً ليتودد إليه ويتغزل به."
      }
    ]
  },
  {
    sectionNumber: 4,
    title: "Section 4: Act 3, Scene 5 – Phoebe Rebuffs Silvius & Falls for Ganymede",
    titleAr: "القسم الرابع: الفصل الثالث – قسوة فيبي ووقوعها في غرام غانيميد",
    bookPages: "Student's Book p. 120–121 / Activity Book p. 186–187",
    storySoFarEn: "Touchstone gets engaged to Audrey. Silvius tries to win Phoebe's heart, but Phoebe scorns him cruelly. Ganymede steps in to defend Silvius, sharply reprimanding Phoebe for her foolish pride. To Ganymede's astonishment, Phoebe instantly falls in love with Ganymede instead!",
    storySoFarAr: "يخطب تاتشستون الراعية أودري. يتودد سيلفيوس لفيبي فتقسو عليه قائلة إن الأعين لا تجرح ولا تقتل. يتدخل غانيميد مدافعاً عن سيلفيوس ويوبخ فيبي بحدة على غرورها. ولصدمة روزاليند، تقع فيبي في حب غانيميد من النظرة الأولى!",
    extractOriginal: `Phoebe: I would not be thy executioner. I fly thee, for I would not injure thee. Thou tell’st me there is murder in mine eye... And if mine eyes can wound, now let them kill thee.
Rosalind, as Ganymede: I pray you, do not fall in love with me, for I am falser than vows made in wine. Besides, I like you not. If you will know my house, ’tis at the tuft of olives, here hard by... Shepherdess, look on him better, and be not proud.`,
    extractModern: `Phoebe: I don’t want to be your executioner! I run away from you so that you won’t get hurt. You tell me there’s murder in my eyes... If my eyes can really hurt anyone, then let them kill you.
Rosalind, as Ganymede: Please, don’t fall in love with me. I am more fake than a promise from a drunk. Besides, I don’t like you. If you want to know where I live, it’s near that olive bush, nearby... Shepherdess, think better of him, and stop being so proud.`,
    extractAr: `فيبي: لا أريد أن أكون سيافك وجلادك! أهرب منك لكي لا تتأذى. أنت تزعم أن في عينيّ قتلاً ورصاصاً... حسناً، إن كانت عيناي تجرحان فلتقتلاك الآن!
غانيميد (روزاليند): أرجوكِ لا تقعي في حبي، فأنا أكثر زيفاً من عهود السكارى! فضلاً عن ذلك أنا لا أطيقكِ. وإذا أردتِ معرفة بيتي فهو عند شجيرات الزيتون القريبة... أيتها الراعية، انظري إليه نظرة أفضل وكفاكِ غروراً وعجرفة!`,
    glossary: [
      { word: "executioner", pos: "n", meaningEn: "someone who sentences people to death", meaningAr: "جلاد / منفذ الإعدام" },
      { word: "cowardly", pos: "adv", meaningEn: "showing a lack of courage", meaningAr: "بجبن / خنوع" },
      { word: "frowning", pos: "v", meaningEn: "an expression made when someone is angry", meaningAr: "عابس / مقطب الجبين" },
      { word: "reject", pos: "v", meaningEn: "saying no to someone or something", meaningAr: "يرفض / ينبذ" },
      { word: "fake", pos: "adj", meaningEn: "not real or truthful", meaningAr: "زائف / مخادع" }
    ],
    exercises: [
      {
        type: "qa",
        question: "Why did Phoebe fall in love with Ganymede?",
        questionAr: "لماذا وقعت فيبي في حب غانيميد؟",
        answer: "Because no man had ever spoken to her with such firmness and harsh pride before, which fascinated her.",
        answerAr: "لأنه لم يسبق لأي رجل أن تحدث إليها بهذه الشدة والصرامة دون تملق، فسحرها ذلك."
      },
      {
        type: "matching",
        question: "Match characters: Ganymede -> ________ ; Phoebe -> ________ ; Silvius -> ________",
        questionAr: "طابق الشخصيات: غانيميد -> ... ؛ فيبي -> ... ؛ سيلفيوس -> ...",
        answer: "Ganymede reprimanded Phoebe | Phoebe fell in love with Ganymede | Silvius confessed unrequited love to Phoebe",
        answerAr: "غانيميد وبخ فيبي | فيبي وقعت في حب غانيميد | سيلفيوس شكا حبه لفيبي"
      }
    ]
  },
  {
    sectionNumber: 5,
    title: "Section 5: Act 4, Scene 3 – The Lioness Attack & Oliver's Redemption",
    titleAr: "القسم الخامس: الفصل الرابع – هجوم اللبؤة وتوبة أوليفر الصادقة",
    bookPages: "Student's Book p. 122–123 / Activity Book p. 188–189",
    storySoFarEn: "Oliver arrives in the forest seeking Orlando. While sleeping, Oliver is threatened by a snake and a hungry lioness. Orlando discovers his sleeping brother, conquers his desire for revenge, and slays the lioness, suffering a wounded arm. Oliver repents and brings Orlando's bloody handkerchief to Ganymede. Hearing the tale, Rosalind faints.",
    storySoFarAr: "يصل أوليفر للغابة باحثاً عن أورلاندو. ينام تحت شجرة وتكاد تفتك به أفعى ولبؤة جائعة. يراه أورلاندو وينتصر نبل قلبه على رغبة الانتقام، فيصرع اللبؤة وينقذ أخاه بعد أن جُرحت ذراعه. يتوب أوليفر ويحمل منديل أورلاندو الملطخ بالدماء لغانيميد، فتغمى على روزاليند لهول الصدمة.",
    extractOriginal: `Oliver:
Twice did he turn his back and purposed so,
But kindness, nobler ever than revenge,
And nature, stronger than his just occasion,
Made him give battle to the lioness,
Who quickly fell before him; in which hurtling,
From miserable slumber I awaked.
...
He led me instantly unto his cave,
There stripped himself, and here upon his arm
The lioness had torn some flesh away,
Which all this while had bled. And now he fainted,
And cried in fainting upon Rosalind.`,
    extractModern: `Oliver:
He turned his back twice, thinking of leaving me there. But his kindness was stronger than his desire for revenge, and his good heart couldn’t keep him from leaving his brother behind. He fought with the lioness, who quickly died, and the noise from their fight woke me from my sleep.
...
Orlando then took me to his cave, where he took off his clothes and saw that he had a wound on his arm, where the lioness had bitten him. This wound had been bleeding the whole time. Orlando fainted while crying out for ‘Rosalind’.`,
    extractAr: `أوليفر:
أدار ظهره مرتين عازماً على تركي لمصيري،
لكن اللطف والشهامة، الأسمى دوماً من الانتقام،
وطبيعته الطاهرة التي غلبت مشاعر الحقد المبرر،
دفعته لمنازلة اللبؤة المفترسة
التي صرعها في معركة سريعة؛ ومن جلبة القتال
استيقظت من نومي البائس مرعوباً!
...
أخذني فوراً إلى كهفه، وهناك نزع ثيابه
فإذا باللبؤة قد نهشت لحم ذراعه
التي ظلت تنزف طوال ذلك الوقت. وهناك أغمي عليه
وهو يهتف في إغمائه باسم "روزاليند"!`,
    glossary: [
      { word: "handkerchief", pos: "n", meaningEn: "a piece of fabric used for hygiene or kept in pocket", meaningAr: "منديل جيب من القماش" },
      { word: "revenge", pos: "n", meaningEn: "to hurt someone who hurt you", meaningAr: "انتقام وثأر" },
      { word: "deserted", pos: "adj", meaningEn: "somewhere with no people, isolated", meaningAr: "مهجور / مقفر" },
      { word: "wound", pos: "n", meaningEn: "an injury to the body", meaningAr: "جرح / إصابة" },
      { word: "bleeding", pos: "v", meaningEn: "losing blood from a cut", meaningAr: "ينزف دماً" }
    ],
    exercises: [
      {
        type: "qa",
        question: "Why did Orlando decide to save his cruel brother Oliver from the lioness?",
        questionAr: "لماذا قرر أورلاندو إنقاذ أخيه القاسي أوليفر من اللبؤة المفترسة؟",
        answer: "Because his innate kindness was nobler than revenge, and his good heart could not leave his brother to die.",
        answerAr: "لأن شهامته وطيبته كانتا أسمى من الانتقام، ولم يطاوعه قلبه النبيل أن يترك أخاه للموت."
      },
      {
        type: "qa",
        question: "Why did Rosalind faint when Oliver showed her the handkerchief?",
        questionAr: "لماذا أغمي على روزاليند عندما أراها أوليفر المنديل؟",
        answer: "Because it was soaked in Orlando's blood and she was deeply terrified for the life of her beloved.",
        answerAr: "لأنه كان مخضباً بدماء أورلاندو فارتعب قلبها خوفاً على حياة حبيبها."
      }
    ]
  },
  {
    sectionNumber: 6,
    title: "Section 6: Act 5, Scene 4 – Hymen's Blessing, Four Weddings & Frederick's Conversion",
    titleAr: "القسم السادس: الفصل الخامس – بهجة الأعراس الأربعة وتوبة فريدريك",
    bookPages: "Student's Book p. 124–125 / Activity Book p. 190–191",
    storySoFarEn: "Oliver falls in love with Aliena (Celia) and returns his father's estate to Orlando. Rosalind sheds her disguise. Hymen, god of marriage, unites four happy couples: Orlando & Rosalind, Oliver & Celia, Silvius & Phoebe, and Touchstone & Audrey. Jacque de Boys arrives with news: Duke Frederick marched an army to kill Duke Senior, met an old religious hermit, converted to a spiritual life, restored the dukedom, and retired to a monastery.",
    storySoFarAr: "يقع أوليفر في حب أليينا (سيليا) ويعيد أملاك والده لأورلاندو. تكشف روزاليند عن هويتها الحقيقية. يبارك إله الزواج هيمان أربعة أعراس مباركة. يصل جاك دي بويز بنبأ مذهل: زحف فريدريك بجيشه للغابة فالتقى بناسك ناسك مبارك هداه للتوبة، فتنازل عن العرش لأخيه الدوق الأكبر واعتزل في دير للعبادة.",
    extractOriginal: `Hymen:
Peace, ho! I bar confusion.
’Tis I must make conclusion
Of these most strange events.
Here’s eight that must take hands
To join in Hymen’s bands...
[To Rosalind and Orlando] You and you no cross shall part.
[To Celia and Oliver] You and you are heart in heart.
[To Phoebe] You to his love must accord, or have a woman to your lord.
[To Audrey and Touchstone] You and you are sure together, as the winter to foul weather.
...
Jacque de Boys:
Duke Frederick, hearing how that every day
Men of great worth resorted to this forest,
Addressed a mighty power, purposely to take
His brother here and put him to the sword...
Where, meeting with an old religious man,
After some question with him, was converted
Both from his enterprise and from the world,
His crown bequeathing to his banished brother!`,
    extractModern: `Hymen:
Quiet, now! I will clear up any confusion. I’m the one who will bring the ending to these strange events. Here before me are eight people, who must join hands and be married:
[To Rosalind and Orlando] No fight will ever break you apart.
[To Celia and Oliver] Your hearts are together as one.
[To Phoebe] You must accept his love (Silvius).
[To Audrey and Touchstone] You two belong together, like winter and bad weather.
...
Jacque de Boys:
Duke Frederick put together a powerful army to take this land and kill his brother. They arrived at the edge of the forest, and there they met with an old religious man. They talked for a while, and, in the end, the man helped Duke Frederick give up the war and this world to become a religious man himself. He now gives his crown to his brother and the lands back to his men!`,
    extractAr: `هيمان (رمز الزواج والوفاق):
اسكنوا واهدأوا! لقد وضعت حداً للحيرة والارتباك.
أنا من سيضع خاتمة سعيدة لهذه الأحداث العجيبة.
ها هم ثمانية أشخاص يشبكون أياديهم في رباط الزواج المقدس:
(لروزاليند وأورلاندو): لن يفرق بينكما أي شقاق.
(لسيليا وأوليفر): قلباكما نبض واحد.
(لفيبي): عليكِ قبول حب سيلفيوس المخلص أو الزواج من امرأة!
(لتاتشستون وأودري): أنتما لبعضكما كما ينتمي الشتاء للطقس العاصف!
...
جاك دي بويز:
حشد الدوق فريدريك جيشاً جراراً لقتل أخيه واجتياح الغابة،
وحين وصل أطرافها التقى بناسك عابد تقي،
وبعد حديث معه اهتدى قلبه وزهد في الحرب ومتاع الدنيا،
وتنازل عن تاجه وعرشه لأخيه المنفي وأعاد الأراضي لجميع أصحابها!`,
    glossary: [
      { word: "bar", pos: "v", meaningEn: "stop, prevent, prohibit", meaningAr: "يمنع / يضع حداً لـ" },
      { word: "bands", pos: "n", meaningEn: "ties, bonds of holy matrimony", meaningAr: "رباط وثاق الزواج" },
      { word: "foul", pos: "adj", meaningEn: "bad, unpleasant weather", meaningAr: "عاصف / رديء" },
      { word: "tidings", pos: "n", meaningEn: "news, messages", meaningAr: "أنباء / بشارات" },
      { word: "converted", pos: "v", meaningEn: "changed religious or spiritual beliefs", meaningAr: "اهتدى / تحول للتوبة والنسك" },
      { word: "bequeathing", pos: "v", meaningEn: "passing on crown or property to another", meaningAr: "متنازلاً ومورثاً" }
    ],
    exercises: [
      {
        type: "qa",
        question: "How many couples are united in marriage at the climax of 'As You Like It'?",
        questionAr: "كم عدد الأزواج الذين اجتمعوا في رباط الزواج في ختام المسرحية؟",
        answer: "Four couples: Rosalind & Orlando, Celia & Oliver, Silvius & Phoebe, and Touchstone & Audrey.",
        answerAr: "أربعة أزواج: روزاليند وأورلاندو، سيليا وأوليفر، سيلفيوس وفيبي، وتاتشستون وأودري."
      },
      {
        type: "qa",
        question: "What transformed Duke Frederick and ended the conflict?",
        questionAr: "ما الذي حول مسار الدوق فريدريك وأنهى الصراع الدامي؟",
        answer: "He met an old religious hermit at the edge of the forest, converted to spirituality, restored the crown to Duke Senior, and retired to a monastery.",
        answerAr: "التقى بناسك عابد صالح عند مدخل الغابة، فهداه للتوبة والتخلي عن العرش وإعادته للدوق الأكبر واعتزال الدنيا."
      }
    ]
  }
];
