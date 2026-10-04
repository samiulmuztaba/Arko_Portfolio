const terminal = document.querySelector(".terminal");
const terminalContent = document.querySelector(".terminal-content");
const input = document.querySelector(".input-line input");

const navigationCommands = {
    whoami: "whoami",
    skills: "skills",
    projects: "projects",
    achievements: "achievements",
    blog: "blog",
    cp: "cp",
};


function runHelpAnimation() {
    terminalContent.innerHTML = "";

    const commandLine = document.createElement("div");
    commandLine.className = "terminal-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "arko@portfolio:~$";

    commandLine.append(prompt, " help");
    terminalContent.appendChild(commandLine);

    const helpText = document.createElement("div");
    helpText.className = "help-text";

    const commands = [
        ["whoami", "who I am"],
        ["skills", "what I can do"],
        ["projects", "what I've done with what I can do"],
        ["achievements", "what I've achieved"],
        ["blog", "my articles"],
        // ["cp", "competitive programming"],
    ];

    commands.forEach(([name, description], index) => {
        const line = document.createElement("div");

        const command = document.createElement("span");
        command.textContent = name;

        line.append(command, ` - ${description}`);

        line.style.opacity = "0";
        line.style.animation =
            `terminal-line-in 160ms steps(2, end) ${1200 + index * 130}ms forwards`;

        helpText.appendChild(line);
    });

    terminalContent.appendChild(helpText);
}


function executeCommand(command) {
    if (command === "help") {
        runHelpAnimation();
        return;
    }

    if (command === "clear") {
        terminalContent.innerHTML = "";
        return;
    }

    const sectionId = navigationCommands[command];

    if (sectionId) {
        const section = document.getElementById(sectionId);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }
}


input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
        return;
    }

    const command = input.value.trim().toLowerCase();

    input.value = "";

    if (command === "") {
        return;
    }

    executeCommand(command);
    input.focus();
});


runHelpAnimation();
input.focus();