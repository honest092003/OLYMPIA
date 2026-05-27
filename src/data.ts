export interface Athlete {
  id: string;
  name: string;
  division: string;
  image: string;
  stats: {
    height: string;
    weight: string;
    focus: string;
    career: string[];
  };
  motto: string;
}

export interface Championship {
  id: string;
  month: string;
  day: string;
  title: string;
  sub: string;
  location: string;
  isMain?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageIndex: number; // reference photo in the gallery or custom styling
  details: string;
}

export const TITANS_DATA: Athlete[] = [
  {
    id: "jang-sung-yeop",
    name: "JANG SUNG YEOP",
    division: "212 Bodybuilding",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugvxB9FDo50_cABdRm-J5tRLCf1tcAzT0bmom1SrF37oKgmoadn1meBppk4Oo024NBmpGjn2cqi9oXQlZxworrKDL3WA59DjQ3eKkwX1H435Mq1X3vc1uTpoLa4pH9txKf9qgLNfpl65w12gA5wpqkr-6EZTYjerRJ4VgynlCrbDZXxEIQRij91d8_irwMRPgFImJ1Ok3ABbA3guMAGQHEPa5VaOUMgmmqcCw_r58REp3bYeqNQZfIXGu3LpsvdglwmAvW83E87rOE",
    stats: {
      height: "163cm",
      weight: "102kg (On-season)",
      focus: "Double Biceps, Chest Depth, Leg Sweep",
      career: [
        "IFBB Pro 212 Regional Winner",
        "Mr. Olympia 212 Qualified Athlete",
        "Seoul Pro 212 Division Champion"
      ]
    },
    motto: "중량은 거짓말을 하지 않는다. 매 순간 죽을 각오로 당겨라."
  },
  {
    id: "kim-min-su",
    name: "KIM MIN SU",
    division: "Classic Physique",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4KyGqyntVeM-oB2Zp7fZQV0r83WHagon0Qu-iInF406wpOwT1ImpIPr_IevAPv_xu__TPj-dLd53lPak-K51f6mTvduhYwBTCousRNBYMGk9OVK8TyTNLtdd_90hghSjC3KPsG2wVIyf0eD5bARl6V9yuaCuzxSWY72Edr_qqhY35x3H9Kfk6ojKIeqWFnAKMaVdjgwDeYG9NOJCd2Gdlwxkirk6QA9kBtr8k6dFwvzvF6qiOaRZ3ari_huxpkEqSjnXa8OC13lgZ",
    stats: {
      height: "186cm",
      weight: "115kg (On-season)",
      focus: "Front Double Biceps, Golden V-Taper, Vacuum Pose",
      career: [
        "IFBB Pro Classic Physique Overall Champion",
        "Mr. Olympia Classic Physique Top Contender",
        "Korea Grand Prix Classic Star Winner"
      ]
    },
    motto: "완벽한 프레임 속에 담긴 원초적인 강인함, 그것이 클래식이다."
  },
  {
    id: "luna-park",
    name: "LUNA PARK",
    division: "IFBB Pro Wellness",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC73RoM3TmkMynxzzVRXnwM_QWLa_o232p8RwX6Z7b8ADK0c2SdhcWWZLvMa4qWRzg3sPy0WGDsWUR1H_K1frbc6J0DH7VCFA_55irY7ogaBT1W3RseblPPC6HV3QVnHepTSiWdkMU2ze7fadHDMT5eChc42COk2LSEliyivD9nFa6XP301_U--iwFJYtfBkuYwCbk_2iuQVEOyYLLk-XSbjumrXQr0Ica1eK_YmLuJOD9PHfcGXn-BHKpEo4gWz7q_vcBBoI1lIOBl",
    stats: {
      height: "168cm",
      weight: "68kg (On-season)",
      focus: "Glute-Ham Tie-in, Quad Sweep, Shoulder Symmetry",
      career: [
        "IFBB Pro Wellness Asia Championship Winner",
        "Mr. Olympia Wellness Finalist",
        "Korea Pro Show Wellness Champion"
      ]
    },
    motto: "여성의 몸이 선사할 수 있는 가장 압도적이고 아름다운 근육미."
  }
];

export const CHAMPIONSHIPS_DATA: Championship[] = [
  {
    id: "seoul-pro",
    month: "OCT",
    day: "12",
    title: "SEOUL PRO",
    sub: "OLYMPIA QUALIFIER",
    location: "KINTEX, KOREA",
    isMain: false
  },
  {
    id: "mr-olympia",
    month: "NOV",
    day: "15",
    title: "MR. OLYMPIA",
    sub: "LAS VEGAS, NV",
    location: "LAS VEGAS, NEVADA, USA",
    isMain: true
  },
  {
    id: "korea-grand-prix",
    month: "DEC",
    day: "05",
    title: "KOREA GRAND PRIX",
    sub: "SEASON FINALE",
    location: "SEOUL OLYMPIC PARK",
    isMain: false
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "protein",
    name: "TITAN ISOLATE HYDROLYZED WHEY",
    category: "SUPPLEMENT",
    price: 89000,
    imageIndex: 2,
    details: "초고정밀 가수분해 분리유청밀 단백질 (WPIH) 24g. 소화 편하고 빠른 흡수."
  },
  {
    id: "preworkout",
    name: "TITAN EXTREME RUSH PRE-WORKOUT",
    category: "ENERGY",
    price: 49000,
    imageIndex: 2,
    details: "베타알라닌 3.2g, L-시트룰린 6g, 신들린 펌핑력과 엄청난 정밀 집중 폭발."
  },
  {
    id: "creatine",
    name: "ULTRA CREAPURE CREATINE 100%",
    category: "POWER",
    price: 35000,
    imageIndex: 2,
    details: "독일 크레아퓨어 정품 100%. 근력 증가와 세포 수화 극대화."
  },
  {
    id: "capsule",
    name: "ANABOLIC INTEL MULTI-VITAMIN",
    category: "HEALTH",
    price: 42000,
    imageIndex: 2,
    details: "체내 하이퍼 핏 훈련자를 위한 필수 종합 멀티비타민 미네랄 최강 코어블렌드."
  }
];

export const MOTIVATIONS: string[] = [
  "고통은 지나간다. 그러나 근육은 영원하다.",
  "바벨을 내릴 생각은 집어치워라. 다음 세트가 네 삶을 결정할 것이다.",
  "챔피언과 패배자의 차이는 마지막 1회, 숨이 멎을 듯한 극한에서 밀어 올렸는가에 달려 있다.",
  "운동 가기 싫은 날, 바로 그 날이 역사적인 고중량 세트를 칠 날이다.",
  "식사와 수면 역시 전술이다. 훈련만 해서는 괴물이 될 수 없다.",
  "타협하는 순간, 너의 한계는 거기서 멈춘다."
];
