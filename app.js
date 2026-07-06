// ==========================================================================
// MBTI Test Application Logic
// ==========================================================================

// 1. Question Database
const questions = [
  // E vs I (Energy Direction)
  {
    id: 1,
    type: "EI",
    question: "주말에 특별한 계획이 없을 때, 당신의 행동은?",
    answerA: { text: "심심하다! 친구들에게 연락해 번개 모임을 잡거나 밖으로 나간다.", score: "E" },
    answerB: { text: "절호의 기회다! 침대 속에서 넷플릭스를 보며 나만의 충전 시간을 갖는다.", score: "I" }
  },
  {
    id: 2,
    type: "EI",
    question: "새로운 사람들로 붐비는 모임이나 파티에 갔을 때 당신은?",
    answerA: { text: "모르는 사람들과도 금방 대화를 시작하며 현장 분위기를 즐긴다.", score: "E" },
    answerB: { text: "기 빨린다... 아는 사람 곁에만 머물거나 구석에서 조용히 관찰한다.", score: "I" }
  },
  {
    id: 3,
    type: "EI",
    question: "바쁜 하루를 보낸 후 에너지를 충전하는 가장 효과적인 방법은?",
    answerA: { text: "친구들과 맛있는 것을 먹고 수다를 떨며 스트레스를 날린다.", score: "E" },
    answerB: { text: "휴대폰을 무음으로 해두고, 혼자 방에서 조용히 휴식을 취한다.", score: "I" }
  },
  
  // S vs N (Information Processing)
  {
    id: 4,
    type: "SN",
    question: "공상 과학 영화를 보거나 소설을 읽을 때 당신의 머릿속은?",
    answerA: { text: "눈앞에 보이는 현실감 넘치는 액션과 화려한 스토리에 집중한다.", score: "S" },
    answerB: { text: "'만약 저런 미래가 진짜 오면 어떨까?', 꼬리에 꼬리를 무는 상상을 펼친다.", score: "N" }
  },
  {
    id: 5,
    type: "SN",
    question: "친구가 \"나 이번에 새로 나온 최신 가전제품 샀어!\"라고 할 때 당신의 반응은?",
    answerA: { text: "\"화소는 어때? 배터리 시간은? 디자인이랑 색상 보여줘!\" (구체적인 정보 탐색)", score: "S" },
    answerB: { text: "\"오 진짜 부럽다! 일상이 완전 스마트해지겠네, 삶의 질 올라갔어?\" (사용 환경이나 기분 상상)", score: "N" }
  },
  {
    id: 6,
    type: "SN",
    question: "초행길을 찾아가야 할 때 당신이 길을 찾는 방식은?",
    answerA: { text: "지도 앱의 3D 뷰나 거리 표시, 랜드마크를 실시간으로 대조하며 확실하게 간다.", score: "S" },
    answerB: { text: "지도를 한 번 슥 보고 대략적인 방향만 파악한 채 느낌과 직감에 의존해 걷는다.", score: "N" }
  },

  // T vs F (Decision Making)
  {
    id: 7,
    type: "TF",
    question: "친구가 울적한 목소리로 \"오늘 너무 슬퍼서 빵 샀어...\"라고 말할 때 당신의 대답은?",
    answerA: { text: "\"무슨 일 있어? 왜 슬픈 거야? 무슨 빵 샀는데?\" (슬픈 감정에 먼저 집중 및 공감)", score: "F" },
    answerB: { text: "\"무슨 빵 샀는데? 맛있는 거 샀어? 단 거 먹고 기분 풀어!\" (빵이라는 객관적 팩트에 집중)", score: "T" }
  },
  {
    id: 8,
    type: "TF",
    question: "지인이 연애나 직업 관련으로 심각한 고민을 털어놓을 때 당신의 조언 스타일은?",
    answerA: { text: "\"진짜 힘들었겠다... 네 마음이 다 이해 가.\" 위로와 공감으로 마음에 힘을 준다.", score: "F" },
    answerB: { text: "\"상황이 그렇다면 일단 이것부터 해결하자.\" 냉철하게 원인을 분석하고 해결책을 제시한다.", score: "T" }
  },
  {
    id: 9,
    type: "TF",
    question: "함께 진행하는 프로젝트에서 누군가의 실수로 차질이 생겼을 때 나의 속마음은?",
    answerA: { text: "'실수한 본인은 얼마나 괴로울까... 기죽지 않게 팀 분위기부터 챙겨야겠다.'", score: "F" },
    answerB: { text: "'어쩌다 이런 일이 생겼지? 책임 소재를 파악하고 당장 수정 계획부터 세워야겠다.'", score: "T" }
  },

  // J vs P (Lifestyle / Action)
  {
    id: 10,
    type: "JP",
    question: "다음 주말에 떠날 여행을 준비하는 당신의 계획표는?",
    answerA: { text: "1일차 점심 식당, 2일차 동선, 예비 계획까지 꼼꼼히 정리해 둔다.", score: "J" },
    answerB: { text: "숙소와 교통편만 정해놓고, 자세한 코스는 당일 날씨와 컨디션에 맞춰 유연하게 정한다.", score: "P" }
  },
  {
    id: 11,
    type: "JP",
    question: "중요한 과제나 보고서 제출 마감일이 다가올 때 당신의 업무 스타일은?",
    answerA: { text: "스케줄러에 일별 분량을 쪼개어 적고, 매일 조금씩 완료해 나간다.", score: "J" },
    answerB: { text: "미루고 미루다가 마감 직전 벼락치기로 몰입하여 초인적인 힘으로 끝낸다.", score: "P" }
  },
  {
    id: 12,
    type: "JP",
    question: "공부나 작업을 시작하기 위해 책상 앞에 앉았을 때, 당신의 주변 환경은?",
    answerA: { text: "필요한 물건들이 제 위치에 깔끔하게 정리되어 있어야 마음이 편안해진다.", score: "J" },
    answerB: { text: "조금 어질러져 있어도 신경 쓰지 않으며, 오히려 자연스럽고 집중이 잘 된다.", score: "P" }
  }
];

// 2. MBTI Types Database
const mbtiProfiles = {
  "ISTJ": {
    nickname: "청렴결백한 논리주의자",
    description: "약속을 철저히 지키며 매사에 책임감이 강하고 현실적인 성격입니다. 규칙과 전통을 중요시하며, 신중하고 꼼꼼하게 일을 처리하는 믿음직한 사람입니다.",
    features: [
      "한 번 맡은 일은 끝까지 책임지고 완수합니다.",
      "계획이 어긋나는 것을 극도로 싫어하며 실용성을 추구합니다.",
      "감정 표현에는 다소 서툴지만 행동으로 진심을 보여줍니다.",
      "집중력이 뛰어나며 사실과 자료에 입각하여 판단합니다."
    ],
    careers: ["회계사", "공무원", "데이터 분석가", "경찰관"],
    hobbies: ["퍼즐 맞추기", "독서", "정리정돈", "DIY 조립"],
    bestMatch: { type: "ESFP", name: "자유로운 영혼의 연예인" },
    worstMatch: { type: "ENFP", name: "재기발랄한 활동가" }
  },
  "ISFJ": {
    nickname: "용감한 수호자",
    description: "차분하고 따뜻하며 책임감이 강한 수호자입니다. 타인을 세심하게 배려하고 도움을 주는 데에서 큰 기쁨을 느끼며, 헌신적이고 신뢰할 수 있는 성향입니다.",
    features: [
      "기억력이 뛰어나며 주변 사람들의 세세한 취향이나 생일을 잘 챙깁니다.",
      "갈등을 피하고 평화를 유지하기 위해 양보와 배려를 아끼지 않습니다.",
      "보이지 않는 곳에서 묵묵히 맡은 바를 다하며 생색내지 않습니다.",
      "변화보다는 안정감을 선호하며 가족과 친구를 지극히 아낍니다."
    ],
    careers: ["간호사", "유치원 교사", "인사 담당자", "사회복지사"],
    hobbies: ["제과제빵", "원예", "앨범 정리", "자수 및 공예"],
    bestMatch: { type: "ESTP", name: "모험을 즐기는 사업가" },
    worstMatch: { type: "ENTP", name: "뜨거운 논쟁을 즐기는 변론가" }
  },
  "INFJ": {
    nickname: "선의의 옹호자",
    description: "이상주의적인 성향이 강하며, 깊이 있는 통찰력으로 사람들을 돕는 옹호자입니다. 겉은 조용해 보이지만 내면에는 강인한 신념과 열정이 가득 차 있습니다.",
    features: [
      "사람의 심리를 꿰뚫어 보는 직관과 뛰어난 통찰력을 지녔습니다.",
      "진정성 있는 인간관계를 중요시하며 얕은 넓은 인맥보다 깊은 관계를 선호합니다.",
      "도덕적인 원칙을 중요하게 생각하며 사회적 불의에 목소리를 냅니다.",
      "생각이 너무 많아서 스스로 피곤해지는 경향이 있습니다."
    ],
    careers: ["상담심리사", "작가", "환경 운동가", "성직자"],
    hobbies: ["일기 쓰기", "독주 감상", "명상", "독립 영화 감상"],
    bestMatch: { type: "ENFP", name: "재기발랄한 활동가" },
    worstMatch: { type: "ESTP", name: "모험을 즐기는 사업가" }
  },
  "INTJ": {
    nickname: "용의주도한 전략가",
    description: "이성적이고 두뇌 회전이 빠르며 계획적인 전략가입니다. 높은 기준과 독립적인 성향을 바탕으로 문제를 창의적이고 완벽하게 해결해 나가는 타입입니다.",
    features: [
      "자신만의 논리적 기준이 확고하며 비효율적인 시스템을 거부합니다.",
      "지적 호기심이 매우 강하고 끊임없이 자기계발을 추구합니다.",
      "감정에 휘둘리지 않고 철저히 이성에 따라 결정을 내립니다.",
      "장기적인 목표를 설계하고 이를 끈기 있게 실행에 옮깁니다."
    ],
    careers: ["소프트웨어 개발자", "전략 기획자", "교수", "투자 분석가"],
    hobbies: ["체스 및 보드게임", "코딩", "재테크 분석", "단독 운동(헬스 등)"],
    bestMatch: { type: "ENFP", name: "재기발랄한 활동가" },
    worstMatch: { type: "ESFP", name: "자유로운 영혼의 연예인" }
  },
  "ISTP": {
    nickname: "만능 재주꾼",
    description: "냉철한 이성과 왕성한 호기심을 가진 실무형 인재입니다. 상황 적응력이 뛰어나며 직접 손으로 만지고 도구를 다루는 일에 탁월한 소질이 있습니다.",
    features: [
      "평소에는 조용하지만 문제 상황이 닥치면 임기응변 능력이 뛰어납니다.",
      "간섭을 극도로 싫어하며 개인의 프라이버시를 매우 중시합니다.",
      "필요 이상의 에너지를 쓰지 않는 효율주의자(귀차니즘이 동반됨)입니다.",
      "스릴 넘치는 모험이나 활동적인 야외 스포츠를 즐기곤 합니다."
    ],
    careers: ["엔지니어", "파일럿", "데이터 분석가", "응급 구조사"],
    hobbies: ["오토바이/자동차 정비", "익스트림 스포츠", "조립 블록", "캠핑"],
    bestMatch: { type: "ESFJ", name: "사교적인 외교관" },
    worstMatch: { type: "ENFJ", name: "정의로운 사회운동가" }
  },
  "ISFP": {
    nickname: "호기심 많은 예술가",
    description: "말없이 다정하고 온화하며 현재를 즐기는 낭만주의자입니다. 겸손하고 수줍음이 많지만 내면에는 개성 넘치는 예술적 감각이 잠재되어 있습니다.",
    features: [
      "타인의 감정을 잘 살피며 갈등이 생기는 상황을 극도로 피합니다.",
      "자유를 사랑하며 틀에 박힌 규칙이나 빡빡한 스케줄을 답답해합니다.",
      "자연이나 예술적인 것에서 심미적 아름다움을 잘 느낍니다.",
      "남의 부탁을 거절하는 데 서투르며 속마음을 쉽게 드러내지 않습니다."
    ],
    careers: ["화가/디자이너", "작곡가/뮤지션", "플로리스트", "수의사"],
    hobbies: ["드로잉/미술", "음악 감상", "반려동물 케어", "카페 투어"],
    bestMatch: { type: "ENFJ", name: "정의로운 사회운동가" },
    worstMatch: { type: "ENTJ", name: "대담한 지도자" }
  },
  "INFP": {
    nickname: "열정적인 중재자",
    description: "상냥하고 온화한 이상주의자로 마음이 따뜻하고 조용합니다. 자신이 가치 있게 여기는 일이나 사람들에게 헌신적이며, 상상력이 풍부한 유형입니다.",
    features: [
      "공감 능력이 매우 뛰어나며 타인의 아픔에 자기 일처럼 눈물짓습니다.",
      "자아 성찰과 삶의 의미를 찾는 데 관심이 많으며 깊은 감수성을 가집니다.",
      "마음의 문을 열기까지 시간이 걸리지만, 한 번 열리면 끝없는 애정을 줍니다.",
      "비판에 쉽게 상처받으며 현실적인 조율보다 이상을 꿈꾸는 편입니다."
    ],
    careers: ["소설가/시인", "예술 치료사", "심리 상담사", "크리에이터"],
    hobbies: ["문학 창작", "타로 카드", "버스킹 관람", "인디 음악 발굴"],
    bestMatch: { type: "ENTJ", name: "대담한 지도자" },
    worstMatch: { type: "ESTJ", name: "엄격한 관리자" }
  },
  "INTP": {
    nickname: "논리적인 사색가",
    description: "비판적인 관점과 논리적인 분석력으로 무장한 지적 탐구가입니다. 지식 그 자체를 탐닉하며, 독창적인 아이디어와 개념을 설계하는 데 능합니다.",
    features: [
      "논리적이지 못한 주장이나 모순을 발견하면 즉각적으로 반박하고 싶어 합니다.",
      "사람들과 가벼운 스몰 토크를 나누는 것보다 깊이 있는 지적 대화를 원합니다.",
      "아이디어가 샘솟지만, 귀찮아서 실행을 미루는 경우가 빈번합니다.",
      "개인주의적 성향이 강하고 대인관계의 폭이 다소 좁은 편입니다."
    ],
    careers: ["학자/연구원", "소프트웨어 아키텍트", "경제학자", "변리사"],
    hobbies: ["우주/철학 다큐 감상", "체스/바둑", "코딩 토이프로젝트", "조립식 로봇"],
    bestMatch: { type: "ENTJ", name: "대담한 지도자" },
    worstMatch: { type: "ESFJ", name: "사교적인 외교관" }
  },
  "ESTP": {
    nickname: "모험을 즐기는 사업가",
    description: "행동력이 뛰어나고 에너지가 넘치며, 매 순간 직관적으로 즐거움을 찾아 나섭니다. 현실 감각이 탁월하고 사교적인 만능 해결사입니다.",
    features: [
      "생각하기보다 행동을 먼저 개시하며 온몸으로 부딪혀서 배웁니다.",
      "사람들과 소통하는 능력이 뛰어나 어디를 가든 분위기 메이커 역할을 합니다.",
      "과거에 미련을 두지 않고 미래를 불안해하지 않으며 현재에 집중합니다.",
      "지루하고 긴 설명이나 복잡한 이론 연구를 싫어합니다."
    ],
    careers: ["영업 마케터", "사업가", "스포츠 분석가", "금융 브로커"],
    hobbies: ["액티비티 체험", "운동경기 직관", "여행 계획 없이 떠나기", "게임"],
    bestMatch: { type: "ISFJ", name: "용감한 수호자" },
    worstMatch: { type: "INFJ", name: "선의의 옹호자" }
  },
  "ESFP": {
    nickname: "자유로운 영혼의 연예인",
    description: "삶의 에너지가 넘쳐흐르며 주위 사람들에게 웃음과 기쁨을 선사하는 타입입니다. 예술적이고 패션 센스가 돋보이며 주목받는 것을 기꺼이 즐깁니다.",
    features: [
      "정이 많고 천성이 낙천적이어서 모든 사람과 쉽게 친구가 됩니다.",
      "지루한 것을 참지 못하며 호기심이 생기면 바로 실행해야 직성이 풀립니다.",
      "상황 판단력이 빠르고 다른 사람의 외형적 변화나 감정을 잘 알아챕니다.",
      "오늘의 즐거움에 빠져 충동적으로 소비하거나 미루는 경향이 있습니다."
    ],
    careers: ["연예인/배우", "이벤트 플래너", "투어 가이드", "홍보 전문가"],
    hobbies: ["노래방 가기", "쇼핑", "댄스 교실", "새로운 맛집 탐방"],
    bestMatch: { type: "ISTJ", name: "청렴결백한 논리주의자" },
    worstMatch: { type: "INTJ", name: "용의주도한 전략가" }
  },
  "ENFP": {
    nickname: "재기발랄한 활동가",
    description: "생기발랄하고 매력적인 분위기를 뿜어내며, 지칠 줄 모르는 에너지를 가진 창의적 영혼입니다. 풍부한 상상력과 사교성으로 세상을 긍정적으로 채웁니다.",
    features: [
      "공감력과 리액션이 좋아 주위에 항상 사람이 끊이지 않습니다.",
      "좋아하는 일에는 엄청난 추진력을 발휘하지만, 쉽게 질려서 마무리가 약합니다.",
      "감정이 표정에 다 드러나며, 자유롭고 구속받지 않는 상태를 열망합니다.",
      "상대방의 가치관이나 속마음을 읽어내는 깊은 통찰력을 가졌습니다."
    ],
    careers: ["콘텐츠 크리에이터", "마케터", "상담사", "카피라이터"],
    hobbies: ["버스킹 구경", "즉흥 여행", "글쓰기", "사진 촬영"],
    bestMatch: { type: "INFJ", name: "선의의 옹호자" },
    worstMatch: { type: "ISTJ", name: "청렴결백한 논리주의자" }
  },
  "ENTP": {
    nickname: "뜨거운 논쟁을 즐기는 변론가",
    description: "지적인 도전과 새로운 아이디어를 제안하는 것에 짜릿함을 느끼는 변론가입니다. 고정관념을 타파하고 재치 넘치는 논리로 토론을 주도하는 지적 모험가입니다.",
    features: [
      "두뇌 회전이 매우 빠르며 재치 있고 유머러스한 화법을 구사합니다.",
      "남들과 똑같은 길을 가는 것을 거부하며 나만의 독창성을 내세웁니다.",
      "토론을 좋아하지만 악의는 없으며, 단순한 지적 호기심과 검증의 과정입니다.",
      "끈기 있게 파고들기보다 또 다른 흥미로운 주제로 옮겨가는 성향이 있습니다."
    ],
    careers: ["스타트업 창업가", "기획자", "컨설턴트", "변호사"],
    hobbies: ["기술 트렌드 공부", "토론 커뮤니티 활동", "주식 분석", "IT 기기 탐색"],
    bestMatch: { type: "INFJ", name: "선의의 옹호자" },
    worstMatch: { type: "ISFJ", name: "용감한 수호자" }
  },
  "ESTJ": {
    nickname: "엄격한 관리자",
    description: "명확한 룰과 효율성을 바탕으로 팀이나 조직을 체계적으로 이끄는 관리자입니다. 현실적이며 헌신적이고, 성실하게 의무를 수행하는 지도자형 성격입니다.",
    features: [
      "시간 약속이나 약속된 규칙을 어기는 행동을 매우 싫어합니다.",
      "리더십이 탁월하고 업무 처리가 빠르며 결단력이 돋보입니다.",
      "목표를 정하면 과정의 효율성을 극대화하여 빠르게 결과물을 냅니다.",
      "공감 능력을 발휘하기보단 이성적인 판단으로 문제를 직시하길 권유합니다."
    ],
    careers: ["프로젝트 매니저(PM)", "군인/경찰 간부", "경영진", "자산 관리사"],
    hobbies: ["일정표 짜기", "골프", "가정 예산 계획 세우기", "러닝"],
    bestMatch: { type: "INTP", name: "논리적인 사색가" },
    worstMatch: { type: "INFP", name: "열정적인 중재자" }
  },
  "ESFJ": {
    nickname: "사교적인 외교관",
    description: "친절하고 사교적이며 타인을 향한 배려심이 몸에 밴 외교관입니다. 자신이 소속된 모임의 화합을 돕고 사람들을 하나로 묶어주는 수호천사 같은 존재입니다.",
    features: [
      "리액션의 제왕으로 남의 이야기를 경청하고 폭풍 공감을 잘해줍니다.",
      "주변 사람들에게 칭찬받고 인정받을 때 가장 큰 에너지를 얻습니다.",
      "조화롭고 평화로운 관계를 소중히 여기며 갈등이 생기면 솔선수범 중재합니다.",
      "계획적인 모임을 좋아하며 사람들을 대접하는 것에서 행복을 느낍니다."
    ],
    careers: ["호텔리어", "승무원", "초등학교 교사", "홍보 담당자"],
    hobbies: ["홈 파티 개최", "쿠킹 클래스", "친목 도모 스포츠", "봉사 활동"],
    bestMatch: { type: "ISTP", name: "만능 재주꾼" },
    worstMatch: { type: "INTP", name: "논리적인 사색가" }
  },
  "ENFJ": {
    nickname: "정의로운 사회운동가",
    description: "사람들에게 선한 영향력을 퍼뜨리는 타고난 리더입니다. 온화하고 카리스마가 넘치며 다른 사람들의 성장을 적극적으로 돕는 따뜻한 정치가 타입입니다.",
    features: [
      "사람들의 잠재력을 발견하고 이를 극대화할 수 있게 끊임없이 지지해 줍니다.",
      "말솜씨가 수려하고 공감 능력이 풍부하여 대중을 매료시키는 능력이 있습니다.",
      "자신보다 타인의 행복을 우선시하여 스스로 스트레스를 받기도 합니다.",
      "평화와 화합을 추구하며 비판에 상당히 민감하게 반응합니다."
    ],
    careers: ["스피치 강사", "진로 상담 교사", "외교관", "비영리 단체 운영자"],
    hobbies: ["연설/독서 모임", "글쓰기", "기부 챌린지", "멘토링"],
    bestMatch: { type: "ISFP", name: "호기심 많은 예술가" },
    worstMatch: { type: "ISTP", name: "만능 재주꾼" }
  },
  "ENTJ": {
    nickname: "대담한 지도자",
    description: "강한 의지와 열정으로 목표를 쟁취해 내는 타고난 카리스마의 통솔자입니다. 문제를 객관적으로 진단하고 완벽하게 조직을 리드해 나가는 추진력 대장입니다.",
    features: [
      "도전 정신이 강하며 어려운 문제나 큰 목표를 맞닥뜨릴수록 열정이 타오릅니다.",
      "비효율적인 구조와 나태함을 지켜보지 못하고 과감하게 개혁합니다.",
      "단호하고 결단력이 빠르며 미래의 비전을 제시하는 시야가 넓습니다.",
      "공감보단 해결책 제시가 우선이라 차갑다는 오해를 받기도 합니다."
    ],
    careers: ["경영 컨설턴트", "벤처 캐피털리스트", "기업 CEO", "전략 컨설턴트"],
    hobbies: ["경영학 공부", "토론 클럽", "웨이트 트레이닝", "어학 공부"],
    bestMatch: { type: "INFP", name: "열정적인 중재자" },
    worstMatch: { type: "ISFP", name: "호기심 많은 예술가" }
  }
};

// 3. State Variables
let currentQuestionIndex = 0;
let userAnswers = []; // Stores individual question answers e.g. [{type: 'EI', score: 'E'}, ...]

// 4. Dom Elements
const sectionIntro = document.getElementById("section-intro");
const sectionQuestion = document.getElementById("section-question");
const sectionLoading = document.getElementById("section-loading");
const sectionResult = document.getElementById("section-result");

const btnStart = document.getElementById("btn-start");
const btnChoiceA = document.getElementById("btn-choice-a");
const btnChoiceB = document.getElementById("btn-choice-b");
const btnBack = document.getElementById("btn-back");
const btnShare = document.getElementById("btn-share");
const btnRestart = document.getElementById("btn-restart");

const progressBar = document.getElementById("progress-bar");
const currentStepNum = document.getElementById("current-step-num");
const progressPercent = document.getElementById("progress-percent");
const questionIndexBadge = document.getElementById("question-index-badge");
const questionText = document.getElementById("question-text");
const choiceTextA = document.getElementById("choice-text-a");
const choiceTextB = document.getElementById("choice-text-b");

// Result Elements
const resultMbtiType = document.getElementById("result-mbti-type");
const resultMbtiNickname = document.getElementById("result-mbti-nickname");
const resultDescription = document.getElementById("result-description");
const resultFeaturesList = document.getElementById("result-features-list");
const resultCareers = document.getElementById("result-careers");
const resultHobbies = document.getElementById("result-hobbies");
const matchBestType = document.getElementById("match-best-type");
const matchBestName = document.getElementById("match-best-name");
const matchWorstType = document.getElementById("match-worst-type");
const matchWorstName = document.getElementById("match-worst-name");
const toastMessage = document.getElementById("toast-message");

// EI, SN, TF, JP Bars
const barEI = document.getElementById("bar-EI");
const barSN = document.getElementById("bar-SN");
const barTF = document.getElementById("bar-TF");
const barJP = document.getElementById("bar-JP");

const labelE = document.getElementById("label-E");
const labelI = document.getElementById("label-I");
const labelS = document.getElementById("label-S");
const labelN = document.getElementById("label-N");
const labelT = document.getElementById("label-T");
const labelF = document.getElementById("label-F");
const labelJ = document.getElementById("label-J");
const labelP = document.getElementById("label-P");

const valE = document.getElementById("val-E");
const valI = document.getElementById("val-I");
const valS = document.getElementById("val-S");
const valN = document.getElementById("val-N");
const valT = document.getElementById("val-T");
const valF = document.getElementById("val-F");
const valJ = document.getElementById("val-J");
const valP = document.getElementById("val-P");

// 5. Functions

// Helper for smooth navigation between screens
function navigateTo(targetSection) {
  const activeSection = document.querySelector(".app-section.active");
  if (activeSection === targetSection) return;
  
  if (activeSection) {
    activeSection.classList.remove("active");
    setTimeout(() => {
      activeSection.style.display = "none";
      targetSection.style.display = "block";
      // Force Layout Reflow
      targetSection.offsetWidth;
      targetSection.classList.add("active");
    }, 450); // slightly shorter than 500ms transition
  } else {
    targetSection.style.display = "block";
    targetSection.classList.add("active");
  }
}

// Start Test
function startTest() {
  currentQuestionIndex = 0;
  userAnswers = [];
  loadQuestion();
  navigateTo(sectionQuestion);
}

// Load Question
function loadQuestion() {
  const q = questions[currentQuestionIndex];
  
  // Format current index (e.g. 01, 02)
  const paddedIndex = String(q.id).padStart(2, '0');
  questionIndexBadge.textContent = `Q.${paddedIndex}`;
  
  // Set question and choices
  questionText.textContent = q.question;
  choiceTextA.textContent = q.answerA.text;
  choiceTextB.textContent = q.answerB.text;
  
  // Update progress UI
  const progressVal = (currentQuestionIndex / questions.length) * 100;
  progressBar.style.width = `${progressVal}%`;
  currentStepNum.textContent = currentQuestionIndex + 1;
  progressPercent.textContent = `${Math.round(progressVal)}%`;
  
  // Control visibility of back button
  if (currentQuestionIndex === 0) {
    btnBack.style.visibility = "hidden";
    btnBack.style.opacity = "0";
  } else {
    btnBack.style.visibility = "visible";
    btnBack.style.opacity = "1";
  }
}

// Handle Choice Selection
function selectChoice(choice) {
  const q = questions[currentQuestionIndex];
  const chosenScore = choice === 'A' ? q.answerA.score : q.answerB.score;
  
  // Store or overwrite answer
  userAnswers[currentQuestionIndex] = {
    type: q.type,
    score: chosenScore
  };
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    // Animate transition between questions inside the card
    const card = document.querySelector(".question-card");
    const choices = document.querySelector(".choices-container");
    
    card.style.transform = "translateX(-20px)";
    card.style.opacity = "0";
    choices.style.transform = "translateY(15px)";
    choices.style.opacity = "0";
    
    setTimeout(() => {
      loadQuestion();
      card.style.transform = "translateX(0)";
      card.style.opacity = "1";
      choices.style.transform = "translateY(0)";
      choices.style.opacity = "1";
    }, 250);
  } else {
    // End of questions, go to loading screen
    progressBar.style.width = "100%";
    progressPercent.textContent = "100%";
    
    setTimeout(() => {
      runLoadingScreen();
    }, 400);
  }
}

// Go to Previous Question
function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    const card = document.querySelector(".question-card");
    const choices = document.querySelector(".choices-container");
    
    card.style.transform = "translateX(20px)";
    card.style.opacity = "0";
    choices.style.transform = "translateY(15px)";
    choices.style.opacity = "0";
    
    setTimeout(() => {
      loadQuestion();
      card.style.transform = "translateX(0)";
      card.style.opacity = "1";
      choices.style.transform = "translateY(0)";
      choices.style.opacity = "1";
    }, 250);
  }
}

// Run Loading / Analyzing Screen
function runLoadingScreen() {
  navigateTo(sectionLoading);
  
  // Simulate heavy computation / anticipation
  setTimeout(() => {
    calculateAndShowResult();
  }, 2200);
}

// Calculate MBTI Type and Render Result Page
function calculateAndShowResult() {
  // Aggregate scores
  const scoreCounts = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };
  
  userAnswers.forEach(ans => {
    scoreCounts[ans.score]++;
  });
  
  // Construct 4-letter type
  const mbti = [
    scoreCounts.E >= scoreCounts.I ? 'E' : 'I',
    scoreCounts.S >= scoreCounts.N ? 'S' : 'N',
    scoreCounts.T >= scoreCounts.F ? 'T' : 'F',
    scoreCounts.J >= scoreCounts.P ? 'J' : 'P'
  ].join('');
  
  // Render text data
  const profile = mbtiProfiles[mbti];
  resultMbtiType.textContent = mbti;
  resultMbtiNickname.textContent = profile.nickname;
  resultDescription.textContent = profile.description;
  
  // Render feature list
  resultFeaturesList.innerHTML = "";
  profile.features.forEach(feat => {
    const li = document.createElement("li");
    li.textContent = feat;
    resultFeaturesList.appendChild(li);
  });
  
  // Render career tags
  resultCareers.innerHTML = "";
  profile.careers.forEach(career => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = career;
    resultCareers.appendChild(span);
  });
  
  // Render hobby tags
  resultHobbies.innerHTML = "";
  profile.hobbies.forEach(hobby => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = hobby;
    resultHobbies.appendChild(span);
  });
  
  // Render chemistry
  matchBestType.textContent = profile.bestMatch.type;
  matchBestName.textContent = profile.bestMatch.name;
  matchWorstType.textContent = profile.worstMatch.type;
  matchWorstName.textContent = profile.worstMatch.name;
  
  // Render Chart Bars
  // For each dimension, there are 3 questions. Let's convert counts into percentages
  // EI Dimension
  const totalEI = scoreCounts.E + scoreCounts.I;
  const pctE = Math.round((scoreCounts.E / totalEI) * 100);
  const pctI = 100 - pctE;
  valE.textContent = `${pctE}%`;
  valI.textContent = `${pctI}%`;
  updateChartBar(barEI, pctE, pctI, labelE, labelI);

  // SN Dimension
  const totalSN = scoreCounts.S + scoreCounts.N;
  const pctS = Math.round((scoreCounts.S / totalSN) * 100);
  const pctN = 100 - pctS;
  valS.textContent = `${pctS}%`;
  valN.textContent = `${pctN}%`;
  updateChartBar(barSN, pctS, pctN, labelS, labelN);

  // TF Dimension
  const totalTF = scoreCounts.T + scoreCounts.F;
  const pctT = Math.round((scoreCounts.T / totalTF) * 100);
  const pctF = 100 - pctT;
  valT.textContent = `${pctT}%`;
  valF.textContent = `${pctF}%`;
  updateChartBar(barTF, pctT, pctF, labelT, labelF);

  // JP Dimension
  const totalJP = scoreCounts.J + scoreCounts.P;
  const pctJ = Math.round((scoreCounts.J / totalJP) * 100);
  const pctP = 100 - pctJ;
  valJ.textContent = `${pctJ}%`;
  valP.textContent = `${pctP}%`;
  updateChartBar(barJP, pctJ, pctP, labelJ, labelP);
  
  // Navigate to Result
  navigateTo(sectionResult);
}

// Update individual chart progress indicator
function updateChartBar(barElement, pctLeft, pctRight, labelLeft, labelRight) {
  // Reset active classes
  labelLeft.classList.remove("active");
  labelRight.classList.remove("active");
  
  if (pctLeft >= pctRight) {
    // Lean left
    labelLeft.classList.add("active");
    // Set bar progress left: we want the bar to cover the range from left to center.
    // In our style, bar covers from center (50%) to the dominant percentage.
    // If pctLeft is 67% (meaning 33.3% right), distance to left is 17%.
    // So bar starts at 33.3% and runs to 50% (width 16.7%).
    // If pctLeft is 100% (0% right), distance is 50%.
    // Bar starts at 0% and runs to 50% (width 50%).
    const widthVal = pctLeft - 50;
    const leftVal = 50 - widthVal;
    barElement.style.left = `${leftVal}%`;
    barElement.style.width = `${widthVal}%`;
  } else {
    // Lean right
    labelRight.classList.add("active");
    // Bar starts at 50% and runs to the right.
    // If pctRight is 67% (leaning 17% from center), width is 17%.
    // If pctRight is 100%, width is 50%.
    const widthVal = pctRight - 50;
    barElement.style.left = "50%";
    barElement.style.width = `${widthVal}%`;
  }
}

// Copy URL link to clipboard
function copyShareLink() {
  const dummy = document.createElement("input");
  const text = window.location.href;
  
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  
  try {
    document.execCommand("copy");
    showToast();
  } catch (err) {
    // Fallback using modern API
    navigator.clipboard.writeText(text)
      .then(() => showToast())
      .catch(e => console.error("URL 복사에 실패했습니다: ", e));
  }
  
  document.body.removeChild(dummy);
}

// Show custom toast message
function showToast() {
  toastMessage.classList.add("show");
  setTimeout(() => {
    toastMessage.classList.remove("show");
  }, 2000);
}

// Restart Game
function restartTest() {
  navigateTo(sectionIntro);
}

// 6. Event Listeners
btnStart.addEventListener("click", startTest);
btnChoiceA.addEventListener("click", () => selectChoice('A'));
btnChoiceB.addEventListener("click", () => selectChoice('B'));
btnBack.addEventListener("click", previousQuestion);
btnShare.addEventListener("click", copyShareLink);
btnRestart.addEventListener("click", restartTest);

// Initialize Section Displays on load to allow CSS transition on next action
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".app-section");
  sections.forEach(sec => {
    if (sec.id === "section-intro") {
      sec.style.display = "block";
      // Trigger a layout flush to start intro transitions immediately
      sec.offsetHeight;
      sec.classList.add("active");
    } else {
      sec.style.display = "none";
    }
  });
});
