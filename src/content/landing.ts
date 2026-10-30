// Static landing page content (Hebrew). Placeholder details only — no real
// booking, contact or social integrations exist yet.

export const studio = {
  name: "Pilates Studio Hub",
  tagline: "סטודיו לפילאטיס",
};

export const navLinks = [
  { href: "#top", label: "בית" },
  { href: "#classes", label: "שיעורים" },
  { href: "#about", label: "אודות" },
  { href: "#contact", label: "צור קשר" },
];

export const bookLabel = "קביעת שיעור";

export const hero = {
  eyebrow: "פילאטיס מכשירים ומזרן",
  title: "תנועה מדויקת, גוף חזק, נפש רגועה",
  description:
    "סטודיו בוטיק לפילאטיס בלב העיר, עם קבוצות קטנות, הדרכה אישית ואווירה חמה. כאן כל אחד ואחת מתקדמים בקצב שלהם — מהשיעור הראשון ועד לאימון המאתגר הבא.",
  secondaryCta: "גלו את השיעורים שלנו",
  image: {
    src: "/images/hero-group.jpg",
    alt: "קבוצה של חמישה מתאמנים בגילים שונים יושבים על שורת מכשירי רפורמר ומותחים רגליים ישרות עם רצועות, בסטודיו מואר באור יום",
  },
  highlights: ["עד 8 מתאמנים בשיעור מכשירים", "שיעורים לכל הרמות", "בוקר, צהריים וערב"],
};

export type StudioClass = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  details: { term: string; value: string }[];
};

export const classes: StudioClass[] = [
  {
    id: "reformer",
    label: "מכשירים",
    title: "פילאטיס רפורמר",
    description:
      "אימון על מכשיר הרפורמר, המשלב התנגדות של קפיצים לחיזוק עמוק, שיפור יציבה וגמישות. התנועה מבוקרת ועדינה למפרקים, ומאתגרת בדיוק במידה הנכונה.",
    image: {
      src: "/images/reformer-studio.jpg",
      alt: "חלל סטודיו מעוצב עם שורות של מכשירי רפורמר, רצפת עץ וחלונות גבוהים",
    },
    details: [
      { term: "משך השיעור", value: "50 דקות" },
      { term: "גודל קבוצה", value: "עד 8 מתאמנים" },
      { term: "רמה", value: "מתחילים עד מתקדמים" },
      { term: "מה להביא", value: "גרביים עם סוליה מונעת החלקה" },
    ],
  },
  {
    id: "mat",
    label: "מזרן",
    title: "פילאטיס מזרן",
    description:
      "שיעור קבוצתי על מזרן המתמקד בחיזוק שרירי הליבה, נשימה ושליטה בתנועה. משלבים אביזרים כמו כדור, גומיות וטבעת פילאטיס לגיוון ולאתגר.",
    image: {
      src: "/images/mat-class.jpg",
      alt: "מתאמנת יושבת על מזרן בתנוחת סירה, ידיים ורגליים מושטות קדימה",
    },
    details: [
      { term: "משך השיעור", value: "55 דקות" },
      { term: "גודל קבוצה", value: "עד 14 מתאמנים" },
      { term: "רמה", value: "מתאים לכל הרמות" },
      { term: "מה להביא", value: "בגדים נוחים ובקבוק מים (מזרנים יש בסטודיו)" },
    ],
  },
];

export const benefits = [
  {
    id: "instructors",
    title: "צוות מדריכים מוסמך",
    description:
      "מדריכות ומדריכים בעלי הסמכה מקצועית וניסיון רב, שמקפידים על דיוק, בטיחות והתאמה אישית בכל תרגיל.",
  },
  {
    id: "small-groups",
    title: "קבוצות קטנות",
    description:
      "מספר מצומצם של משתתפים בכל שיעור, כך שכל אחד ואחת מקבלים תשומת לב, תיקונים ודגשים אישיים.",
  },
  {
    id: "atmosphere",
    title: "אווירה מזמינה",
    description:
      "חלל שקט ומואר שבו מרגישים בבית מהרגע הראשון — בלי לחץ ובלי השוואות, רק אתם והתנועה.",
  },
] as const;

export const callToAction = {
  title: "מוכנים להתחיל?",
  description:
    "הצטרפו לקהילה שלנו ותגלו כמה טוב הגוף יכול להרגיש. מתחילים? נשמח להתאים לכם שיעור ראשון ברמה הנכונה.",
  note: "מערכת ההזמנות המקוונת תיפתח בקרוב. בינתיים, אפשר לתאם שיעור בטלפון או במייל.",
};

export const contact = {
  address: "רחוב הדוגמה 12, תל אביב",
  phone: "03-000-0000",
  email: "hello@example.com",
  hours: ["א׳–ה׳: 06:30–21:00", "ו׳: 07:00–13:00"],
};

export const socialLinks = [
  { id: "instagram", label: "אינסטגרם" },
  { id: "facebook", label: "פייסבוק" },
  { id: "whatsapp", label: "וואטסאפ" },
] as const;
