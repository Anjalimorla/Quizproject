const finalScore = document.getElementById("finalScore");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

const score = Number(localStorage.getItem("quizScore") || 0);
const total = Number(localStorage.getItem("quizTotal") || 0);

finalScore.textContent = total > 0
    ? `You scored ${score} out of ${total}`
    : "No quiz result found. Start a new quiz.";

retryBtn.addEventListener("click", () => {
    window.location.href = "quiz.html";
});

homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});
