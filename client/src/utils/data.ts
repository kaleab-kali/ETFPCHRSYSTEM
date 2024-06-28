export interface DataStructure {
    [key: string]: {
      [key: string]: string[];
    };
  }
  
export const data: DataStructure = {
  "Addis Ababa": {
    Kirkos: ["woreda 1", "woreda 2"],
    Bole: ["woreda 11", "woreda 12"],
    Yeka: ["woreda 21", "woreda 22"],
    Lideta: ["woreda 31", "woreda 32"],
    Arada: ["woreda 33", "woreda 34"],
    Gullele: [
      "woreda 1",
      "woreda 2",
      "woreda 3",
      "woreda 4",
      "woreda 5",
      "woreda 6",
      "woreda 7",
      "woreda 8",
      "woreda 9",
    ],

    "Kolfe-Keranio": ["woreda 1", "woreda 2"],
    "Nifas Silk-Lafto": ["woreda 1", "woreda 2"],
    "Addis Ketema": ["woreda 1", "woreda 2"],
    "Akaky Kaliti": ["woreda 1", "woreda 2"],
  },
  Afar: {
    Semera: ["dokira", "Chifra"],
    Awash: ["Awash", "Dubti"],
  },
  Amhara: {
    Bahirdar: ["Bahirdar", "Gondar"],
    "Debre Markos": ["Debre Markos", "Finote Selam"],
  },
  "Benishangul-Gumuz": {
    Assosa: ["Assosa", "Kamashi"],
  },
  "Dire Dawa": {
    "Dire Dawa": ["Dire Dawa", "Goro"],
  },
  Gambela: {
    "Anyuak Zone": ["Abwobo", "Dimma", "Gambela", "Gog", "Jor"],
    "Nuer Zone": ["Akobo", "Jikaw", "Lare", "Wentawo"],
    "Mezhenger Zone": ["Godere", "Mengesh"],
    "Special woredas": ["Itang"]
  },
  Harari: {
    "Harari": ["Amir-Nur Woreda", "Abadir Woreda", "Shenkor Woreda", "Jin'Eala Woreda", "Aboker Woreda", "Hakim Woreda", "Sofi Woreda", "Erer Woreda", "Dire-Teyara Woreda"]
  },
  Oromia: {
    "West Arsi": ["Shashamane", "Arsi Negele", "Dodola", "Asassa", "Kofele", "Adaba", "Gedeb Asasa", "Limuna Bilbilo", "Robe", "Hitosa"],
    "East Arsi": ["Asela", "Bokoji", "Robe", "Etaya", "Dera", "Abomsa", "Hurta", "Sagure", "Kersa", "Merti"],
    "East Bale": ["Dodola", "Ginir", "Goba", "Robe", "Sinana", "Gaserana Gololcha", "Mennana Harena Buluk", "Mulona Sululta", "Walisona Goro", "Wama Bonaya"],
    "Addis Alem": ["Addis Alem", "Bako"],
    Jimma: ["Jimma", "Agaro"],
    Nekemte: ["Nekemte", "Gida Ayana"],
  },
  Sidama: {
    Hawassa: ["Hawassa", "Yirgalem"],
  },
  Somali: {
    Jijiga: ["Jijiga", "Degahabur"],
  },
  "Southern Nations, Nationalities, and Peoples'": {
    Hossana: ["Hossana", "Durame"],
    "Arba Minch": ["Arba Minch", "Chencha"],
  },
  Tigray: {
    Mekelle: ["Mekelle", "Adwa"],
  },
};

export {};
