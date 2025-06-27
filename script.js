const poll = {
  question: 'Choose the party to cast your vote?',
  options: ['0: BJP', '1: Congress', '2: Samajwadi Party', '3: Others'],
  answers: new Array(4).fill(0),

  registerNewAnswer: function () {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n (Write party number)`
      )
    );
    console.log(answer);

    // Register answer
    if (typeof answer === 'number' && answer < this.answers.length) {
      this.answers[answer]++;
    }

    //handle invalid input

    console.log(this.answers);
  },

  displayResult: function (type = 'array') {
    if (type === 'array') {
      // Basic array view (still useful for debugging)
      alert(this.answers);
    } else if (type === 'string') {
      // Show proper election-style result
      let result = '📊 Election Results:\n';
      this.options.forEach((option, index) => {
        result += `${option} - ${this.answers[index]} votes\n`;
      });
      alert(result);
    }
  },
};
document.querySelector('.poll').addEventListener('click', function () {
  poll.registerNewAnswer();
});

document.querySelector('.buy').addEventListener('click', function () {
  poll.displayResult('string');
});

// Showing winner
const modal = document.getElementById('resultModal');
const showBtn = document.getElementById('showBtn');
const closeBtn = document.getElementById('closeBtn');

showBtn.addEventListener('click', function () {
  const winnerText = document.getElementById('winnerText');

  // Find the highest vote count
  const maxVotes = Math.max(...poll.answers);
  const winningIndexes = poll.answers
    .map((votes, index) => (votes === maxVotes ? index : -1))
    .filter(index => index !== -1);

  // If there's a tie
  if (winningIndexes.length > 1) {
    const tiedParties = winningIndexes.map(i => poll.options[i].split(': ')[1]);
    winnerText.innerHTML = `🤝 It's a tie between: <strong>${tiedParties.join(
      ', '
    )}</strong> with ${maxVotes} votes each!`;
  } else {
    const winner = poll.options[winningIndexes[0]].split(': ')[1];
    winnerText.innerHTML = `🏆 The winning party is: <strong>${winner}</strong> with ${maxVotes} votes!`;
  }

  modal.style.display = 'flex';
});
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Close modal if clicked outside
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
