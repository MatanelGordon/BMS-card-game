# Card Game

## התחלת פרויקט בסיסיֿ

ראשית, עשו clone לריפו שלכם

```shell
git clone put-url-here
```

>להמשך השלבים, פתחו git-bash לתיקייה של הריפו שלכם.

צרו פרוייקט עם npm על ידי vite.

בררו מה גרסת ה-npm שלכם:

```shell
npm -v
```

אם גרסת ה-npm שלכם קטנה מ-7, צרו פרוייקט כך:

```shell
npm create vite@latest tmp --template vanilla-ts
```

אם גרסת ה-npm שלכם 7 ומעלה צרו כך:

```shell
npm create vite@latest tmp -- --template vanilla-ts
```

אם שלב זה עבר בהצלחה, אמורה להיות לכם תיקיית tmp חדשה.

## התעסקות עם גיט

קחו את כל התוכן של תיקיית tmp ותעבירו אותה לתיקיית אב. לאחר מכן, תמחקו את תיקיית tmp הריקה.

ועכשיו, נתחיל את המשחק עם גיט:

1. תעשו קומיט לקובץ ה-gitignore בלבד

```shell
    git add .gitignore
    git commit -m "initial commit"
```

2. תעשו קומיט לשאר הקבצים

```shell
git add .
git commir -m "basic boilerplate"
```

3. תעשו push להכל

```shell
git push origin master
```

4. תעברו מ-master ל-branch אחר

```shell
git checkout -b dev
```

## הרמת פרויקט

התקינו את החבילות הרלוונטיות

```shell
npm i
```

על מנת להרים שרת שיראה את השינויים הנוכחיים שלכם ויתעדכן עבור כל שינוי של קובץ, הריצו את הפקודה הבאה

```shell
npm run dev
```

היכנסו לכתובת שהוא מדפיס לכם, לרוב יהיה [`http://localhost:3000`](http://localhost:3000)

****

## קצת על הפרוייקט

כרגע יש לכם פרויקט typescript שמריץ את הקוד שלכם על הדפדפן. מה ש-vite עושה זה לקחת את קבצי ה-typescript שלכם, להמיר אותם ל-javascript ולהריץ אותם על הדפדפן. 

## מבנה הפרוייקט ודגשים

הקובץ שאתם רואים על הדפדפן שרץ בסוף הוא`index.html`. בתחתית הקובץ תוכלו להבחין בתגית `<script></script>` עם הקובץ `src/main.ts` שהוא הקובץ הראשי איתו אתם עובדים.

כמה הערות על המשך העבודה: 

1. תוודאו שאתם מחלקים לקבצים - אין לעשות קובץ אחד ענק עם 500 שורות

2. תוודאו שאתם מחלקים נכון לתיקיות

3. תוודאו שאתם עושים export עבור פונקציות, משתנים, מחלקות או טייפים שאתם רוצים שהקובץ ייחצן

4. אין להשתמש ב-onclick או כל event ישירות ב-html, רק דרך typescript

הקוד הבא לא יעבוד:
```html
<div onclick="clickandler()">click me</div>
```

:הקוד הבא כן יעבוד

```html
<div id="myDiv"></div>
```

```typescript
// in main.ts
const someDiv = document.querySelector<HTMLElement>('#myDiv')!;

const clickHandler =  () => {
    console.log("it's working")
}

someDiv.onclick = clickHandler;
```

5. אתם מקבלים את הפרויקט עם קוד התחלתי של `counter`, יש לוודא שאתם מוחקים את הזכר שלו בעת ההגשה הסופית

6. התרגיל הזה דורש שימוש בסיסי ב-dom:

תוודאו שאתם יודעים כיצד לגשת לתגיות html מתוך קוד (שימוש
ב-`getElementById`)

תוודאו שאתם יודעים לתת לכפתור לבצע קוד בעת לחיצה (שימוש ב-`addEventListener` או `onclick`)

תוודאו שאתם יודעים להשיג את הערך של `input` או `select`.

```typescript
const myInput = document.getElementById('myInput') as HTMLInputElement;

const btn = document.getElementById('myBtn') as HTMLButtonElement;

btn.onclick = () => {
    const inputValue:string = myInput.value;

    console.log(`current input value is ${inputValue}`);
}
```

7. שמרו על קוד נקי, ריווח והזחות נכונות, ותנו שמות אינדיקטיביים

8. תהנו.

## התחלת מימוש

### לוגיקה

#### CardType

צרו `enum` בשם `CardType` שיכיל את סוגי הקלפים השונים. עבור כל ערך תנו מספר - ככל שהמספר גבוה יותר כך סוג הקלף חשוב יותר מאחרים.

#### Card

צרו מחלקה בשם `Card` שתקבל 2 ערכים:

- value: ערך מספרי של הקלף
- type: סוג הקלף 

ממשו עבור המחלקה פונקציה `toString` שמציגה את ערך הקלף והסוג שלו בצורה קריאה

#### DeckBuilder

צרו מחלקה בשם `DeckBuilder` שתהיה אחראית ליצירת חפיסות קלפים. חפיסת קלפים זה מערך של מחלקת `Card`

![deckBuilder UML](./assets/DeckBuilder.png)

- למחלקה אמורה להיות פונקציה שמקבלת רשימה של ערכים מספריים ועבור כל מספר מייצרת 4 קלפים מסוגים שונים אך אותו מספר. הפונקציה שומרת את הקלפים שנוצרו בתוך משתנה של המחלקה `cards`

```typescript
addValuesToAllTypes(values: number[]):void
```

> עבור כל ערך, אם הוא לא בין 1 ל-10 אין להשתמש בו.

- למחלקה אמורה להיות פונקציה שמקבלת אובייקט JSON שהוא מערך של  אובייקטים בו כל אובייקט מייצג קלף, והיא מוסיפה את הקלפים ל-`cards`

```typescript
fromJson({type:string, value:number}[]): void
```

דוגמה לקובץ קונפיגורציה:

```JSON
[
    {"type": "HEART", "value":1},
    {"type": "HEART", "value":2},
    {"type": "HEART", "value":3},
    {"type": "HEART", "value":4},
    {"type": "HEART", "value":5},
    {"type": "CLUB", "value":1},
    {"type": "CLUB", "value":2},
    {"type": "CLUB", "value":3},
    {"type": "CLUB", "value":4},
    {"type": "CLUB", "value":5},
    {"type": "DIAMOND", "value":1},
    {"type": "DIAMOND", "value":2},
    {"type": "DIAMOND", "value":3},
    {"type": "DIAMOND", "value":4},
    {"type": "DIAMOND", "value":5}
]
```

צרו פונקציה במחלקה בשם `getDeck` שמחזירה את הקלפים שהתווספו עד כה.

```typescript
getDeck():Card[]
```



### UI

הוסיפו תגיות לקובץ `index.html` כך שיהיו הדברים הבאים:

* אפשרות לבחור בין לקחת את החפיסה 
מקונפיגורציה או ליצור אחת רנדומלית.
* כפתור התחלת משחק.
* כפתור שהקלף הבא עם ערך גבוה יותר.
* כפתור שהקלף הבא עם ערך נמוך יותר.

המטרה של ה-UI 
היא שהמשתמש יוכל לבחור 
מאיפה הוא רוצה את החפיסה, וכאשר הוא לוחץ על התחלת משחק, רק אז ניקח את הערך של מה הוא בחר, נפעל בהתאם ונתחיל את המשחק.

#### SettingsUI

צרו מחלקה בשם `SettingsUI`:

- למחלקה אמור להיות פונקציה `init` שמאזינה לשינויים של אפשרויות הבחירה ומזינה אותם למשתנה של המחלקה

```typescript
    init():void
```

- למחלקה אמור להיות פונקציה `onSettingsApply` שמקבלת פונקציה והיא תרוץ אך ורק אם הערך של אפשרות הבחירה של החפיסה הוא תקין

```typescript
    onSettingsApply(func):void
```