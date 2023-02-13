document.addEventListener('DOMContentLoaded', () =>{
    const counter       = document.getElementById('counter');
    const minus         = document.getElementById('minus');
    const plus          = document.getElementById('plus');
    const pause         = document.getElementById('pause');
    const likes         = document.querySelector('.likes');
    const heart         = document.getElementById('heart');
    const comments      = document.querySelector('.comments');
    const form          = document.getElementById('comment-form');
    const submit        = document.getElementById('submit');
    let running         = true;

    function appClosure() {
        let currentCount;
        const screenshotMap = {};
        let seconds         = 0;

        init();
        function init() {
            clearInterval(currentCount)
            currentCount = setInterval(() => {
                seconds ++;
                counter.innerHTML = seconds;
            }, 1000);
        }

        return {
            start() {
                currentCount = setInterval(init, 1000)
            },
            stop() {
                clearInterval(currentCount)
            },
            plus() {
                seconds ++;
                counter.innerHTML ++;
            },
            minus() {
                seconds --;
                counter.innerHTML --;
            },
            screenshot() {
                if(screenshotMap.hasOwnProperty(seconds)){
                    screenshotMap[seconds] += 1;
                    const li = document.querySelector(`[data-num=\"${seconds}\"]`);
                    li.innerHTML = `${seconds} has been liked ${screenshotMap[seconds]} times`;
                }
                else {
                    const li = document.createElement('li');
                    li.setAttribute('data-num', seconds);
                    screenshotMap[seconds] = 1;
                    li.innerHTML = `${seconds} has been liked 1 time`;
                    likes.appendChild(li);
                }
            }, // pause, resume
            toggle() {
                running = !running;
                running ? pause.innerText = "pause": pause.innerText = "resume";
                running ? this.start(): this.stop();
                minus.disabled = !minus.disabled;
                plus.disabled = !plus.disabled;
                heart.disabled = !heart.disabled;
                submit.disabled = !submit.disabled;
            }
        }
    };
    let app = appClosure();
    minus.addEventListener('click', () => {
        app.stop();
        app.minus();
        app.start();
    })

    plus.addEventListener('click', () => {
        app.stop();
        app.plus();
        app.start();
    })

    pause.addEventListener('click', () => {
        app.toggle();
    });

    heart.addEventListener('click', () => {
        app.screenshot();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if(running){
            let comment = document.createElement("p");
            comment.innerHTML = e.target[0].value;
            comments.appendChild(comment);
            form.reset();
        }
    });
});
