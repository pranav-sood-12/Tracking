"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureViewTime = void 0;
function captureViewTime(element, durationThreshold) {
    if (durationThreshold === void 0) { durationThreshold = 5000; }
    var startTime = null;
    var viewTime = 0;
    var observer = new IntersectionObserver(function (entries) {
        console.log(entries, Date.now());
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                startTime = Date.now();
            }
            else {
                if (startTime) {
                    viewTime += Date.now() - startTime;
                    startTime = null;
                    if (viewTime >= durationThreshold) {
                        console.log(Math.floor(viewTime / 1000));
                        // Send data to the server here if needed
                        // transport("viewTime", { elementId: (element as HTMLElement).id, duration: viewTime });
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    observer.observe(element);
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            if (startTime) {
                viewTime += Date.now() - startTime;
            }
            if (viewTime >= durationThreshold) {
                // here we have to make call to the transport function as their is shifting of tab
                // transport("viewTime", { elementId: element.id, duration: viewTime });
                console.log('Hidden', Math.floor(viewTime / 1000));
            }
            startTime = startTime === null ? null : Date.now();
            viewTime = 0;
        }
    });
}
exports.captureViewTime = captureViewTime;
