function test(questions) {
    this.skor = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
test.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
test.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.skor++;
    }
 
    this.questionIndex++;
}
 
test.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, secimler, answer) {
    this.text = text;
    this.secimler = secimler;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(secim) {
    return this.answer === secim;
}
 
 
function populate() {
    if(test.isEnded()) {
        showScores();
    }
    else {

        var element = document.getElementById("question");
        element.innerHTML = test.getQuestionIndex().text;
 

        var secimler = test.getQuestionIndex().secimler;
        for(var i = 0; i < secimler.length; i++) {
            var element = document.getElementById("secim" + i);
            element.innerHTML = secimler[i];
            guess("btn" + i, secimler[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        test.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = test.questionIndex + 1;
    var element = document.getElementById("ilerleme");
    element.innerHTML = currentQuestionNumber + "/" + test.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Sonuç</h1>";
    gameOverHTML += "<h2 id='skor'> Skorunuz: " + test.skor + "</h2>";
    var element = document.getElementById("test");
    element.innerHTML = gameOverHTML;
};
 

var questions = [
    new Question("Inception, Batman Başlıyor, Kara Şövalye Yükseliyor filmlerinin yönetmeni kimdir?", ["Steven Spielberg", "Martin Scorsese","George Lucas", "Christoper Nolan"], "Christoper Nolan"),
    new Question("Hangisi Karate Kid filminde Miyagi ustanın genç öğrencisine gösterdiği ilk taktiklerden biridir?", ["Salla Yuvarla", "Sil Süpür", "Bas Çek", "Cilala Parlat"], "Cilala Parlat"),
    new Question("Yalnızca bilimkurgu türünde filmler izleyen biri, hangi filmi izlemiş olabilir?", ["Akıl Oyunları", "Azınlık Raporu","Forrest Gump", "Schindler'in Listesi"], "Azınlık Raporu"),
    new Question("Wolverine hangi filmin karakteridir?", ["Geleceğe Dönüş", "Yenilmezler","X-Men", "Leon"], "X-Men"),
    new Question("Transformers ve Armageddon filmlerinin yönetmeni kimdir?", ["Jim Jarmusch", "Michael Bay","David Fincher", "Danny Boyle"], "Michael Bay"),
];
 

var test = new test(questions);
 

populate();