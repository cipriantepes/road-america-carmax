import "./scss/style.scss";

import "jquery";
import "popper.js";
import "bootstrap";

(function () {
    const btn = document.querySelectorAll(".btn-primary[data-step]");

    // move car
    // when finish change page


    /**
     *
     * @param {string} page - feed from data-step dataset
     */
    function changePage(page) {
        if (!page) {
            return;
        }
        switch (page) {
            case "0":
            case "exit":
                return self.location = "/";
            case "print":
                return self.print();
            default:
                console.log("Redirecting...");
        }
        self.location = `step${page}.html`;
        console.log('he');
    }

    function progressChange(step) {
        const progressBar = document.querySelector(".progress--enrollment__current");
        const steps = document.querySelectorAll(".progress > .progress__step").length;

        if (parseInt(step) < 1) {
            return;
        }

        if (parseInt(step) <= steps) {
            const progressStep = document.querySelector(`.progress__step[data-step-progress="${step}"]`);
            progressBar.style.width = progressStep.style.left;
        }
    }

    btn.forEach((el) => el.addEventListener("click", (ev) => {
        //changePage(el.dataset.step);
        let step = el.dataset.step;
        let delay = parseInt(step) > 1 ? 600 : 0;
        progressChange(step);
        setTimeout(() => changePage(step), delay);
    }));
}());
