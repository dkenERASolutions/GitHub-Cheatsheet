import { useState } from "react";

// ─── COMMANDS DATA ────────────────────────────────────────────────────────────

const COMMANDS = [
    // ── SETUP ──
    {
        id: 1,
        category: "Setup",
        emoji: "⚙️",
        command: "git init",
        plain: "Turn a regular folder into a Git project",
        explain: `Imagine you have a folder on your computer full of code files. Right now, Git has no idea that folder exists — it's just a normal folder, like Pictures or Documents. When you run "git init" inside that folder, Git wakes up and says "okay, I'm going to start watching everything in here." From this moment on, Git tracks every change you make to every file. This is called creating a repository (or "repo" for short) — just a fancy word for a project that Git is tracking. You will see a hidden folder called ".git" appear inside your project — that's where Git stores all its tracking information. Never delete that folder.`,
        vscode: `In VS Code, open your project folder, then open the Terminal panel at the bottom (Menu → Terminal → New Terminal). Make sure the terminal path shows your project folder, then type the command and press Enter.`,
        when: "When you are starting a brand new project from scratch on your own computer and it has never been connected to GitHub before. You only run this once per project.",
        warning: null
    },
    {
        id: 2,
        category: "Setup",
        emoji: "⚙️",
        command: "git clone <url>",
        plain: "Copy a project from GitHub down to your computer",
        explain: `Cloning is like downloading — but smarter. When you clone a repo from GitHub, Git doesn't just copy the files. It copies the entire history of the project (every commit ever made), AND it automatically remembers where it came from so you can push changes back to GitHub later without any extra setup. The URL you use comes from GitHub — on any repo page, click the green "Code" button and copy the HTTPS link. Replace "<url>" in the command with that link. The project will appear as a new folder inside whatever directory your terminal is currently in.`,
        vscode: `In VS Code you can also do this from the welcome screen: click "Clone Git Repository," paste the GitHub URL, and choose where to save it on your computer. VS Code will handle the rest and open the project automatically.`,
        when: "When your instructor shares a template link, when you want to work on a project that already exists on GitHub, or when you're setting up your project on a new computer.",
        warning:
            "Do not run git clone inside a folder that is already a Git repo (already has .git). Always clone into a clean, empty location."
    },
    {
        id: 3,
        category: "Setup",
        emoji: "⚙️",
        command: 'git config --global user.name "Your Name"',
        plain: "Tell Git your name so your work is labeled correctly",
        explain: `Every time you make a commit (a save point), Git stamps your name onto it — like signing a painting. This way, if you're working with others, everyone can see who made which changes. The word "--global" means this setting applies to ALL projects on your computer, not just one. Replace "Your Name" with your actual name, keeping the quotes around it. Example: git config --global user.name "Jordan Smith"`,
        vscode: `Open the VS Code terminal (Menu → Terminal → New Terminal) and type this command exactly, replacing Your Name with your real name. You only ever need to do this once per computer.`,
        when: "The very first time you ever use Git on a new computer. Do this before making any commits.",
        warning: null
    },
    {
        id: 4,
        category: "Setup",
        emoji: "⚙️",
        command: 'git config --global user.email "you@email.com"',
        plain: "Tell Git your email so your GitHub profile gets credit",
        explain: `Along with your name, Git attaches your email address to every commit you make. This email must match the email address you used to sign up for GitHub. Why? Because GitHub uses this email to connect your commits to your GitHub profile — so your contributions show up in your activity graph, your green commit squares appear on your profile, and employers can see your work history. Replace "you@email.com" with your actual GitHub email address, keeping the quotes.`,
        vscode: `Run this in the VS Code terminal right after setting your name. Again, you only need to do this once per computer.`,
        when: "The very first time you use Git on a new computer, right after setting your name with git config user.name.",
        warning:
            "Use the exact same email as your GitHub account or your commits won't show up on your GitHub profile."
    },
    {
        id: 5,
        category: "Setup",
        emoji: "⚙️",
        command: "git config --list",
        plain: "Check all your Git settings",
        explain: `This shows you all the settings Git currently knows about — your name, your email, and a bunch of other configuration options. It's useful to run this to verify your name and email were saved correctly after setting them up. Look for the lines that say "user.name" and "user.email" and confirm they show the right information. Press the letter Q to exit the list if it takes over your terminal.`,
        vscode: `Run this in the VS Code terminal anytime you want to double-check your setup. If you see the wrong name or email, just run the config commands again with the correct information to overwrite them.`,
        when: "After setting up your name and email, to verify everything saved correctly. Also useful when debugging why your commits aren't showing up on your GitHub profile.",
        warning: null
    },

    // ── SAVING WORK ──
    {
        id: 6,
        category: "Saving Work",
        emoji: "💾",
        command: "git status",
        plain: "See exactly what's changed in your project right now",
        explain: `This is the most important command for beginners to know. Think of it as asking Git "what's going on?" Git will tell you three things: (1) files you've changed that aren't staged yet — shown in red, (2) files you've staged and are ready to commit — shown in green, and (3) files that are brand new and Git has never seen before — also shown in red with "untracked." Run this command constantly — before and after every other Git command. It will save you from countless confusing situations because you always know exactly where you stand.`,
        vscode: `In VS Code, you can also see this visually without the terminal. Look at the left sidebar — the Source Control icon (looks like a branch with a circle) shows a number badge when you have unsaved changes. Click it to see all changed files listed. But learning git status in the terminal is important too.`,
        when: "All the time. Literally before and after every other command. When in doubt, run git status first.",
        warning: null
    },
    {
        id: 7,
        category: "Saving Work",
        emoji: "💾",
        command: "git add .",
        plain: "Stage ALL changed files to be included in your next save",
        explain: `Git has a two-step saving process — and this is step one. Think of it like packing a box to ship. "git add" means "put this in the box." The dot (.) means "put EVERYTHING that changed into the box." Git calls this area the "staging area" — a holding zone for changes you're about to commit. The files aren't permanently saved yet — they're just selected and ready. After running this, run git status and you'll see everything has turned from red (unstaged) to green (staged and ready).`,
        vscode: `In VS Code's Source Control panel (the branch icon on the left), you can click the "+" icon next to individual files to stage just that file, or click the "+" next to "Changes" at the top to stage everything — same as git add .`,
        when: "After making changes to your files and you want to include all of them in your next commit. This is almost always the right choice for beginners.",
        warning: `The dot stages EVERYTHING — including files you might not want to save, like test files or accidentally created files. If you only want to stage one specific file, use: git add filename.js`
    },
    {
        id: 8,
        category: "Saving Work",
        emoji: "💾",
        command: "git add filename.js",
        plain: "Stage ONE specific file instead of everything",
        explain: `Sometimes you've changed several files but you only want to save one of them in this commit. For example, you fixed a bug in "App.jsx" but you also have some messy experiments in "test.jsx" that aren't ready. You can add just App.jsx and leave test.jsx out of this commit. Replace "filename.js" with the actual name of the file you want to stage. You can run git add multiple times to add several specific files before committing.`,
        vscode: `In VS Code's Source Control panel, click the "+" icon that appears next to the specific file name when you hover over it. Only that file gets staged — others stay as unstaged changes.`,
        when: "When you want precise control over exactly which changes go into your next commit. Good habit to develop as you get more experienced.",
        warning: null
    },
    {
        id: 9,
        category: "Saving Work",
        emoji: "💾",
        command: 'git commit -m "describe what you changed"',
        plain: "Permanently save your staged files with a description",
        explain: `This is step two of saving — it seals the box and writes a label on it. A commit is a permanent, timestamped snapshot of your code. The "-m" means "message" and what follows in quotes is your description of what changed. This message is incredibly important. Imagine looking back at your project in 3 months — good messages like "Add contact form with email validation" are genuinely useful. Vague messages like "fix", "update", or "asdfgh" tell you nothing. Every developer who has ever worked on a team has been frustrated by someone else's bad commit messages. Be the developer with good messages.`,
        vscode: `In VS Code's Source Control panel, there is a text box at the top that says "Message." Type your commit message there, then click the blue "Commit" button (or press Ctrl+Enter / Cmd+Enter). This does git add + git commit in one step if you've already staged files.`,
        when: "After staging your files with git add, once you've completed a logical chunk of work. Don't wait until you've changed 50 files — commit often, in small meaningful pieces.",
        warning:
            "Never commit with no message or a meaningless message. Future-you will thank present-you for writing clear descriptions."
    },
    {
        id: 10,
        category: "Saving Work",
        emoji: "💾",
        command: "git log --oneline",
        plain: "See your entire commit history in a compact list",
        explain: `This shows you the history of all commits ever made in your project — most recent at the top. Each line shows two things: a short 7-character ID code (like "a1b2c3d") and your commit message. This ID is important — it's like an address for that specific moment in time, and some Git commands use it. The full version (git log without --oneline) shows more detail including the full ID, author, date, and full message. Press Q to exit the log view if it fills your terminal.`,
        vscode: `VS Code has a built-in timeline — click the Source Control icon, scroll down to find "Timeline" at the bottom of the panel. You can also install the "GitLens" extension (free) which shows beautiful commit history right inside your editor.`,
        when: "When you want to see what changes have been made and when. Also when you need to find the ID of a specific past commit to go back to or reference.",
        warning: null
    },
    {
        id: 11,
        category: "Saving Work",
        emoji: "💾",
        command: "git diff",
        plain: "See exactly what lines of code changed since your last commit",
        explain: `This shows you a line-by-line comparison of what's different between your current files and the last commit. Lines starting with a "+" in green are new lines you added. Lines starting with a "-" in red are lines you deleted or changed. Lines with no symbol are unchanged context lines shown for reference. This is useful when you can't remember exactly what you changed and want to review before committing. Press Q to exit. If you want to see differences for one specific file, add the filename: git diff filename.js`,
        vscode: `This is where VS Code really shines. Click any changed file in the Source Control panel and VS Code shows you a beautiful side-by-side diff view — the old version on the left, new version on the right, with color highlighting. Much easier to read than the terminal version.`,
        when: "Before committing, to review exactly what you changed and make sure you're not accidentally including something you didn't mean to.",
        warning: null
    },

    // ── GITHUB REMOTE ──
    {
        id: 12,
        category: "GitHub (Remote)",
        emoji: "☁️",
        command: "git remote -v",
        plain: "Check if your project is connected to GitHub and see the URL",
        explain: `The word "remote" in Git means a version of your project that lives somewhere else — like on GitHub.com. "Origin" is just the nickname Git uses for your main remote (it's convention, not a rule). This command shows you the URL that "origin" points to. If you see two lines showing a GitHub URL — one for "(fetch)" and one for "(push)" — your project is connected. If you see nothing, your local project is a solo project with no connection to GitHub yet. Think of it as checking whether your project has a cloud backup address.`,
        vscode: `You don't see remotes visually in VS Code by default, but if the Sync button appears in the bottom status bar, it means VS Code detected a remote connection. Install the GitLens extension to see remote details in a sidebar panel.`,
        when: "When you're not sure if your project is connected to GitHub. Also useful for debugging push/pull issues — if the URL is wrong, that's why commands are failing.",
        warning: null
    },
    {
        id: 13,
        category: "GitHub (Remote)",
        emoji: "☁️",
        command: "git remote add origin <url>",
        plain: "Connect your local project to a GitHub repository for the first time",
        explain: `If you started a project on your computer with git init (not by cloning), your project exists locally but has no connection to GitHub yet. This command creates that connection. "origin" is the nickname you're giving to the remote — everyone uses "origin" by convention. The <url> is the GitHub repository URL you get from the "Code" button on GitHub. After running this, your project knows where to push to and pull from. You only ever run this once per project.`,
        vscode: `You can also do this through VS Code: open the Source Control panel, click "Publish Branch," and VS Code will ask you to log into GitHub and choose a repo name. It handles the remote setup automatically.`,
        when: "When you started a project locally with git init and now you've created a matching repo on GitHub.com and want to link them together.",
        warning:
            "Make sure the GitHub repo you're linking to is completely empty (no README, no files) or you'll get conflicts right away."
    },
    {
        id: 14,
        category: "GitHub (Remote)",
        emoji: "☁️",
        command: "git push",
        plain: "Upload your committed changes to GitHub",
        explain: `After making commits, those saves only exist on YOUR computer. If your laptop breaks, your work is gone. Push sends your commits up to GitHub so they're backed up in the cloud, shareable with teammates, and visible on your GitHub profile. Think of committing as saving a document locally, and pushing as uploading it to Google Drive. You can make many commits before pushing — they all go up at once. Push is also what triggers Vercel to rebuild and redeploy your portfolio website automatically.`,
        vscode: `In the VS Code status bar at the very bottom, you'll see a cloud icon with an up arrow and a number — that number is how many commits are waiting to be pushed. Click it to push, or open the Source Control panel and click the three-dot menu → Push.`,
        when: "After committing work that you want to back up, share, or deploy. Many developers push at the end of every coding session as a habit.",
        warning:
            "If this is your very first push on a new branch, Git will ask you to run: git push -u origin main — just copy and run that instead. The -u sets up tracking so future pushes just need git push."
    },
    {
        id: 15,
        category: "GitHub (Remote)",
        emoji: "☁️",
        command: "git pull",
        plain: "Download AND merge the latest GitHub changes into your computer",
        explain: `Pull is a combination of two steps in one: it first fetches (downloads) any new commits from GitHub, then immediately merges them into your current branch. If you're working alone, this is how you sync between your work computer and your laptop. If you're working in a team, this is how you get your teammates' latest work. Always pull before you start working — if you don't, you might spend an hour coding on an outdated version of the project and then have a painful merge conflict when you try to push.`,
        vscode: `In VS Code, click the sync icon (circular arrows) in the bottom status bar — this does a pull AND push together. Or go to Source Control panel → three-dot menu → Pull.`,
        when: "At the start of every single coding session. Before making any changes. Especially critical when working with teammates.",
        warning:
            "If you have uncommitted changes on your computer when you pull, Git might get confused. Always commit or stash your work before pulling."
    },
    {
        id: 16,
        category: "GitHub (Remote)",
        emoji: "☁️",
        command: "git fetch",
        plain: "Download updates from GitHub WITHOUT merging them yet",
        explain: `Fetch is like checking your mailbox — you see what's there without bringing it inside yet. When you fetch, Git downloads all the latest commits and updates from GitHub into a special holding area on your computer, but it does NOT change any of your current files or your current branch. Nothing in your working code changes. This is safer than git pull when you want to first SEE what has changed on GitHub before deciding to integrate it. After fetching, you can run git log origin/main --oneline to see what's waiting, then decide when to merge it in. git pull = git fetch + git merge happening automatically. git fetch = just the download part, no merge.`,
        vscode: `In VS Code, open the Source Control panel, click the three-dot menu at the top, and select "Fetch." VS Code will show you if there are new commits on GitHub without changing your local files.`,
        when: "When you want to check what's changed on GitHub before merging. Great for team projects where you want to review incoming changes first. Also useful before starting work to see if anyone else pushed anything.",
        warning: null
    },
    {
        id: 17,
        category: "GitHub (Remote)",
        emoji: "☁️",
        command: "git push -u origin main",
        plain: "Push to GitHub for the very first time and set up tracking",
        explain: `The first time you push a branch to GitHub, Git doesn't know which GitHub branch to connect it to. The "-u" flag (short for --set-upstream) tells Git: "connect my local main branch to the main branch on GitHub permanently." After you do this once, all future pushes from this branch can just use git push with no extra flags. "origin" is the nickname for GitHub (your remote), and "main" is the branch name. You'll see this command suggested by Git automatically in your terminal if you try git push on a new branch.`,
        vscode: `VS Code usually handles this automatically through the "Publish Branch" button that appears in the Source Control panel the first time you try to push a new repo.`,
        when: "The very first time you push a new project or new branch to GitHub. After this one time, just use git push for all future pushes.",
        warning: null
    },

    // ── BRANCHES ──
    {
        id: 18,
        category: "Branches",
        emoji: "🌿",
        command: "git branch",
        plain: "See a list of all your branches and which one you're on",
        explain: `A branch is like a parallel version of your project. Imagine you're writing an essay — the main branch is your final, clean draft. You create a new branch to try a bold new idea, experiment freely, and if it doesn't work, you just delete that branch and your main draft is untouched. When you run git branch, Git lists all branches. The one with a star (*) and usually highlighted in green is the branch you are currently on. New projects typically start with one branch called "main" (or sometimes "master" in older projects).`,
        vscode: `The current branch name is always shown in the bottom-left corner of VS Code's status bar — it's usually the first thing you see. Click it to see all branches and switch between them with a dropdown.`,
        when: "Whenever you're not sure which branch you're currently on. Always check before making changes.",
        warning: null
    },
    {
        id: 19,
        category: "Branches",
        emoji: "🌿",
        command: "git checkout -b branch-name",
        plain: "Create a brand new branch and jump onto it immediately",
        explain: `This does two things at once: creates a new branch and switches you to it. The new branch starts as an exact copy of whatever branch you were just on — all your existing files and history come with you as a starting point, but from this moment on, any new commits you make only go on this new branch. Your main branch stays frozen and untouched. Name your branch something descriptive — like "add-contact-page" or "fix-navbar-bug." Avoid spaces in branch names; use hyphens instead. Replace "branch-name" with whatever you want to call it.`,
        vscode: `Click the branch name in the bottom-left corner of VS Code → click "Create new branch" at the top of the dropdown → type a name and press Enter. VS Code creates and switches to the new branch automatically.`,
        when: "Before starting any new feature, experiment, or fix that you're not sure about. Working on a separate branch is a professional habit that protects your working code.",
        warning: null
    },
    {
        id: 20,
        category: "Branches",
        emoji: "🌿",
        command: "git checkout branch-name",
        plain: "Switch to a different branch that already exists",
        explain: `This moves you from your current branch onto another existing branch. Your files in VS Code will actually change — they'll reflect whatever that branch's code looks like. Don't be alarmed if you switch branches and a file looks different or seems to be missing — it's not deleted, it just doesn't exist on that branch. Switch back and it returns. To switch back to main: git checkout main. You can also use the newer syntax: git switch branch-name — both work the same way.`,
        vscode: `Click the branch name in the bottom-left corner of VS Code and select any branch from the list to switch to it. VS Code will update all your files to that branch's state instantly.`,
        when: "When you need to move between existing branches — like switching from a feature branch back to main, or switching to review a teammate's branch.",
        warning:
            "Always commit or stash any unsaved changes before switching branches. If you have uncommitted work and try to switch, Git may refuse or, in some cases, carry those changes to the new branch accidentally."
    },
    {
        id: 21,
        category: "Branches",
        emoji: "🌿",
        command: "git merge branch-name",
        plain: "Bring another branch's changes into your current branch",
        explain: `Merging is how you officially combine work from one branch into another. The typical flow is: (1) create a feature branch, (2) do your work and commit on that branch, (3) switch back to main, (4) run git merge with the feature branch name. Git takes all the commits from the feature branch and adds them to main. If no one changed the same lines on both branches, Git merges automatically and everything is fine. If both branches changed the same line in different ways, you get a merge conflict — Git will mark the conflicting spots in the file and ask you to choose which version to keep.`,
        vscode: `Open the Source Control panel → three-dot menu → Branch → Merge Branch → select which branch to merge in. VS Code will show merge conflicts as colored sections directly in the editor with Accept/Reject buttons.`,
        when: "After your feature branch is finished, tested, and working — when you're ready to add that work permanently to your main branch.",
        warning:
            "Always be on the DESTINATION branch before merging. If you want to merge 'feature' into 'main', switch to main first, then run git merge feature."
    },
    {
        id: 22,
        category: "Branches",
        emoji: "🌿",
        command: "git branch -d branch-name",
        plain: "Delete a branch you no longer need",
        explain: `After you've merged a feature branch into main, the branch has done its job and you can clean it up. The "-d" flag is a safe delete — Git will refuse to delete the branch if it has commits that haven't been merged yet, which protects you from accidentally losing work. If you're absolutely sure you want to delete an unmerged branch, use "-D" (capital D) to force delete it. Keeping stale branches around is like keeping every draft of a document — it gets messy fast. Clean up branches after merging.`,
        vscode: `In the Source Control panel, click the three-dot menu → Branch → Delete Branch → select the branch to delete. Make sure you're not currently on the branch you're trying to delete — switch to main first.`,
        when: "After a feature branch has been successfully merged into main and you no longer need it.",
        warning:
            "Make sure you've already merged the branch before deleting, or you'll lose those commits. Git will warn you if you haven't merged with -d, but not with -D."
    },
    {
        id: 23,
        category: "Branches",
        emoji: "🌿",
        command: "git branch -a",
        plain: "See ALL branches including ones on GitHub",
        explain: `Regular git branch only shows your local branches — the ones on your computer. git branch -a shows everything: your local branches AND the branches that exist on GitHub (shown in red with "remotes/origin/" in front of them). This is useful on team projects when you want to see if a teammate has pushed a new branch to GitHub that you don't have locally yet. To check out a remote branch and start working on it locally, run: git checkout -b branch-name origin/branch-name`,
        vscode: `GitLens extension shows remote branches in a dedicated panel. Without it, the branch switcher in VS Code's status bar may also show remote branches.`,
        when: "When working on a team project and you want to see all branches including ones on GitHub that you haven't pulled down yet.",
        warning: null
    },

    // ── INSPECTING ──
    {
        id: 24,
        category: "Inspecting & Comparing",
        emoji: "🔍",
        command: "git log",
        plain: "See the full detailed history of all commits",
        explain: `While git log --oneline shows a compact summary, plain git log gives you the complete picture: the full 40-character commit ID, the author's name and email, the exact date and time of the commit, and the full commit message. This level of detail is useful when you need to investigate who made a specific change, exactly when something was changed, or when you need the full ID of a commit to use in another command. Press the down arrow to scroll through the history, and press Q to quit back to the normal terminal.`,
        vscode: `Install the "GitLens" extension (free, highly recommended) for a beautiful visual commit history right in VS Code. Also try the "Git Graph" extension which shows a graphical tree of all branches and commits.`,
        when: "When you need more detail than --oneline provides — like seeing the exact timestamp, the full commit ID, or the complete multi-line commit message.",
        warning: null
    },
    {
        id: 25,
        category: "Inspecting & Comparing",
        emoji: "🔍",
        command: "git diff --staged",
        plain: "See what changes are staged and ready to be committed",
        explain: `Regular git diff shows changes that are NOT staged yet. git diff --staged (also written as git diff --cached — they're identical) shows the changes that ARE staged — the files you've already run git add on. This is your final review before committing. It's very good practice to run this before every commit to make sure you're including exactly what you think you are, and nothing extra. Lines with "+" are additions, lines with "-" are removals.`,
        vscode: `In VS Code's Source Control panel, clicking on a file listed under "Staged Changes" opens the diff view for that staged file. You see exactly what will go into your next commit.`,
        when: "After running git add and before running git commit — as a final check to review exactly what you're about to save permanently.",
        warning: null
    },
    {
        id: 26,
        category: "Inspecting & Comparing",
        emoji: "🔍",
        command: "git show",
        plain: "See exactly what changed in the most recent commit",
        explain: `git show gives you the complete details of the last commit: who made it, when, the commit message, and a full diff of every line that was added or removed. If you want to look at a specific older commit instead, add its ID: git show a1b2c3d. This is how developers "inspect" a commit — like opening a package and seeing exactly what's inside. Very useful for reviewing your own recent changes or understanding what a teammate committed.`,
        vscode: `In the Source Control panel, clicking on a commit in the Timeline view shows you the changes from that commit. With the GitLens extension, you can hover over any line of code and see who last changed it and in which commit.`,
        when: "When you want to review the details of a specific commit — what exactly changed and what the commit message said.",
        warning: null
    },

    // ── FIXING MISTAKES ──
    {
        id: 27,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git restore filename",
        plain: "Throw away changes to a file and reset it to the last commit",
        explain: `This is your "I changed this file and I regret it" button. It completely discards all the changes you made to that file since your last commit and resets it back to exactly how it was. Think of it as Ctrl+Z but going all the way back to your last commit, not just one step. Replace "filename" with the actual file path, like "src/App.jsx". To discard changes in ALL files at once: git restore . (with a dot).`,
        vscode: `In the Source Control panel, hover over a changed file and click the curved arrow icon (Discard Changes). VS Code will ask you to confirm — click "Discard Changes" in the popup.`,
        when: "When you made changes to a file that you don't want to keep and want to start fresh from your last save point.",
        warning:
            "This is PERMANENT. The changes you throw away are gone forever — there is no undo. Make sure you really don't want those changes before running this."
    },
    {
        id: 28,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git restore --staged filename",
        plain: "Un-stage a file — remove it from the next commit",
        explain: `If you ran git add and then changed your mind about including a specific file in the next commit, this command removes it from the staging area. The key thing to understand: it does NOT delete or change the file itself — your code is perfectly safe. The file just goes back to being "unstaged" (shown in red in git status instead of green). You can then either leave it out of this commit entirely or stage it later in a different commit.`,
        vscode: `In VS Code's Source Control panel, hover over a file listed under "Staged Changes" and click the minus icon (-) that appears. This unstages just that file.`,
        when: "When you ran git add and included a file by mistake and want to remove it from the upcoming commit before you actually commit.",
        warning: null
    },
    {
        id: 29,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git commit --amend --no-edit",
        plain: "Add a forgotten file to your very last commit",
        explain: `You just committed and immediately realized you forgot to include a file. Instead of making a whole new commit just to add that one file, you can "amend" — which means update and replace — your last commit. First stage the file you forgot with git add, then run this command. The "--no-edit" part keeps your original commit message the same. If you also want to change the commit message, leave off --no-edit and Git will open a text editor for you to update it.`,
        vscode: `Stage the forgotten file in Source Control, then click the three-dot menu → Commit → Commit Staged (Amend). This amends the last commit through the VS Code interface.`,
        when: "Immediately after a commit when you realize you forgot to include a file or made a small typo you want to fix before anyone else sees the commit.",
        warning:
            "Only amend commits that haven't been pushed to GitHub yet. If you amend a commit that's already on GitHub and then push, you'll need to force push, which can cause problems for teammates."
    },
    {
        id: 30,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git reset --soft HEAD~1",
        plain: "Undo your last commit but keep all your code changes",
        explain: `HEAD is Git's way of saying "the current commit I'm on." HEAD~1 means "one commit before the current one." --soft means "undo the commit action but keep all the file changes." So this command literally means: go back one commit, but leave all my files exactly as they are. After running this, your files still have all the changes — they're just no longer committed. They'll appear as staged changes (green in git status) ready to be committed again. This is the safest way to undo a commit.`,
        vscode: `In the Source Control panel, go to the three-dot menu → Commit → Undo Last Commit. VS Code does a --soft reset by default, keeping your changes intact.`,
        when: "When you committed too early, committed to the wrong branch, or just want to rewrite the commit with a better message or different files included.",
        warning: null
    },
    {
        id: 31,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git reset --hard HEAD~1",
        plain: "Undo your last commit AND delete all those code changes",
        explain: `This is the nuclear option. --hard means Git will undo the commit AND throw away all the file changes from that commit. Your project goes back to exactly how it was before that last commit, as if it never happened. All code from that commit is deleted. Unlike --soft which keeps your work, --hard wipes it. This can be useful if you realize a whole commit was a mistake and you want a completely clean slate, but it is genuinely dangerous.`,
        vscode: `There's no easy button for this in VS Code because it's risky. It's best done in the terminal. VS Code will warn you if you try through the interface.`,
        when: "When you are absolutely certain you want to delete an entire commit and all the code changes in it. Use --soft first if you're not 100% sure.",
        warning:
            "The deleted code is gone. You cannot easily undo this. If you might need that code later, use --soft instead to just uncommit without deleting."
    },
    {
        id: 32,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git stash",
        plain: "Temporarily hide your work-in-progress without committing",
        explain: `Stash is like a hidden drawer. Imagine you're in the middle of building a new feature — your code is half-done and definitely broken — but your instructor just asked everyone to pull the latest template changes. You can't commit half-broken code, and pulling might cause conflicts with your changes. So you stash: git stash takes all your unsaved changes, bundles them up, hides them in a special area, and gives you a perfectly clean working directory. Now you can pull, merge, or switch branches safely. When you're ready to get your work back, use git stash pop.`,
        vscode: `In the Source Control panel, go to the three-dot menu → Stash → Stash (include untracked). Your changes disappear from view but are safely stored. You'll see a "Stashes" section in the panel.`,
        when: "When you have work-in-progress that isn't ready to commit, but you need to pull, switch branches, or do something else that requires a clean working directory.",
        warning: null
    },
    {
        id: 33,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git stash pop",
        plain: "Bring your hidden work back from the stash",
        explain: `This is the second half of git stash. "Pop" retrieves the most recent stash and puts all those changes back into your working files — exactly as you left them. It's like opening that hidden drawer and taking your work back out. After popping, the stash is removed (hence "pop" — it pops off the top of the stash stack). If you have multiple stashes and want to see them all, run git stash list. To apply a specific stash instead of the most recent, use git stash apply stash@{1}.`,
        vscode: `In the Source Control panel, go to three-dot menu → Stash → Pop Stash, or click the stash item in the Stashes section and select "Apply Stash."`,
        when: "After you've finished the thing that made you stash in the first place (pulled, merged, fixed something) and you're ready to continue your previous work.",
        warning:
            "If your stashed changes conflict with new changes on the branch, you'll get a merge conflict when you pop. Resolve it like any other merge conflict."
    },
    {
        id: 34,
        category: "Fixing Mistakes",
        emoji: "🔧",
        command: "git reflog",
        plain: "See Git's secret history of everything — even 'deleted' commits",
        explain: `Reflog (reference log) is Git's secret diary that records every single thing that has happened to HEAD — every commit, every reset, every checkout, every merge. Even commits you thought you deleted with git reset --hard still appear in the reflog for about 30 days. This is your ultimate recovery tool when you think you've lost work. Find the ID of the state you want to recover (like "HEAD@{3}" or a commit hash), then run: git checkout that-id — and your lost code will reappear. Professional developers have saved hours of work using the reflog.`,
        vscode: `There's no built-in VS Code UI for reflog — use the terminal. The GitLens extension does show some reflog information in its history views.`,
        when: "When you think you've lost code from a git reset --hard, an accidental delete, or any situation where work has seemingly vanished. Check here before panicking.",
        warning: null
    },

    // ── VSCODE SPECIFIC ──
    {
        id: 35,
        category: "VS Code & Terminal Tips",
        emoji: "💻",
        command: "code .",
        plain: "Open the current folder in VS Code from the terminal",
        explain: `If your terminal is already in a project folder and you want to open that exact folder in VS Code, type "code ." and press Enter. The dot means "current folder." VS Code will launch (or switch focus) and open your project. This requires VS Code's "code" command to be installed in your system PATH — VS Code can do this automatically when you install it, or you can enable it from VS Code's Command Palette: Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows) → type "Shell Command" → "Install 'code' command in PATH."`,
        vscode: `This is a terminal command that opens VS Code — so it's used in your system terminal (not inside VS Code). Once you're inside VS Code, use File → Open Folder instead.`,
        when: "When you've navigated to a project folder in your terminal and want to open it in VS Code without using the File menu.",
        warning: null
    },
    {
        id: 36,
        category: "VS Code & Terminal Tips",
        emoji: "💻",
        command: "Ctrl + backtick key",
        plain: "Open or close the integrated terminal in VS Code",
        explain:
            "The backtick key is the key in the top-left of your keyboard, above the Tab key, to the left of the number 1. Pressing Control and that key together opens VS Code's built-in terminal panel at the bottom of the screen. This terminal is already pointed at your project folder — so all your git commands run in the right place automatically. You don't need a separate Terminal app. On Mac, it's the same shortcut: Ctrl + backtick. You can open multiple terminals by clicking the '+' icon in the terminal panel.",
        vscode: `This is the primary way to access Git commands inside VS Code. Alternatively: Menu → Terminal → New Terminal. The terminal always opens in your current project folder.`,
        when: "Every time you need to run git commands. Keep this terminal open at the bottom of VS Code while you work.",
        warning: null
    },
    {
        id: 37,
        category: "VS Code & Terminal Tips",
        emoji: "💻",
        command: "Source Control Panel (Ctrl+Shift+G)",
        plain: "Open VS Code's visual Git interface",
        explain: `VS Code has a built-in visual interface for Git — no terminal required for most common tasks. Press Ctrl+Shift+G (or Cmd+Shift+G on Mac) to open the Source Control panel. From here you can see all changed files, stage individual files by clicking "+", write a commit message and commit by pressing Ctrl+Enter, push/pull using the three-dot menu at the top, see which branch you're on, and resolve merge conflicts with a visual editor. For beginners, this panel is extremely helpful because it makes the invisible (staging, commits) visible and clickable.`,
        vscode: `Click the branch icon in the left sidebar — it's the icon that looks like a circle with lines branching off it (third icon down). The badge number shows how many changes you have.`,
        when: "Anytime you want to manage Git visually without typing commands. Great for staging, committing, and reviewing changes.",
        warning: null
    }
];

const PROBLEMS = [
    {
        id: "pushed-wrong",
        emoji: "😱",
        title: "I pushed something wrong to GitHub",
        steps: [
            {
                label: "Don't panic — nothing is permanently broken",
                desc: "Pushing wrong code to GitHub is one of the most common things that happens to developers at every experience level. Take a breath. Your code is safe and this is fixable. The safest approach is always to fix it forward — add a new commit that corrects the mistake — rather than trying to rewrite history.",
                type: "info"
            },
            {
                label: "First, see your recent commits so you understand what happened",
                desc: "Run this to see your last 5 commits. Look at the messages to identify which commit has the problem.",
                cmd: "git log --oneline -5",
                type: "cmd"
            },
            {
                label: "Option A — Safest: Fix the code and push a new commit",
                desc: "Go back into VS Code, fix whatever was wrong in the code files, save the files, then run these three commands:",
                cmd: 'git add .\ngit commit -m "Fix: correct mistake from previous commit"\ngit push',
                type: "cmd"
            },
            {
                label: "Option B: Undo the last commit, fix it, then push again",
                desc: "This removes the commit but KEEPS all your code changes so you can edit and recommit. Run this, then fix your code in VS Code:",
                cmd: "git reset --soft HEAD~1",
                type: "cmd"
            },
            {
                label: "After fixing with Option B, re-stage and commit",
                cmd: 'git add .\ngit commit -m "Your corrected commit message"\ngit push',
                type: "cmd"
            },
            {
                label: "Still stuck? Ask your instructor",
                desc: "Fixing Git mistakes is a legitimate professional skill. Every developer has been here. Your instructor has too — ask for help, it's exactly what they're there for.",
                type: "tip"
            }
        ]
    },
    {
        id: "merge-conflict",
        emoji: "⚔️",
        title: "I have a merge conflict",
        steps: [
            {
                label: "What is a merge conflict in plain English?",
                desc: "A conflict happens when two different versions of the same file both changed the same line(s) of code, and Git doesn't know which one to use. Git pauses and says 'I can't decide — you pick.' It marks the conflicting sections directly inside your file with special symbols so you can see both versions and choose.",
                type: "info"
            },
            {
                label: "See which files have conflicts",
                desc: "Conflicted files appear as 'both modified' — in the terminal:",
                cmd: "git status",
                type: "cmd"
            },
            {
                label: "Open the conflicted file in VS Code",
                desc: `VS Code makes this much easier than the terminal. The conflict markers look like this inside the file:\n\n<<<<<<< HEAD\nyour code here\n=======\ntheir code here\n>>>>>>> branch-name\n\nVS Code shows these as colored blocks with buttons: "Accept Current Change" (yours), "Accept Incoming Change" (theirs), "Accept Both Changes", or "Compare Changes."`,
                type: "info"
            },
            {
                label: "Click the option that's correct",
                desc: "In VS Code, click one of the four buttons that appear above the conflict block. If you're not sure, click 'Compare Changes' to see them side by side. Pick whichever version of the code is correct — or manually edit it to combine both.",
                type: "info"
            },
            {
                label: "Save the file, then stage and commit the resolution",
                desc: "After resolving all conflicts in all files:",
                cmd: 'git add .\ngit commit -m "Resolve merge conflict"',
                type: "cmd"
            },
            {
                label: "Pro tip: prevent conflicts before they happen",
                desc: "Run git pull every single time before you start coding. Conflicts mostly happen because someone didn't pull first and coded on an old version. One habit prevents 90% of conflicts.",
                type: "tip"
            }
        ]
    },
    {
        id: "wrong-branch",
        emoji: "🌿",
        title: "I committed to the wrong branch",
        steps: [
            {
                label: "Check which branch you're on right now",
                desc: "The star (*) shows your current branch. In VS Code, it's also in the bottom-left corner.",
                cmd: "git branch",
                type: "cmd"
            },
            {
                label: "See your recent commits and copy the commit ID",
                desc: "Find the commit you made on the wrong branch. Copy the short ID (the 7-character code like 'a1b2c3d') from the commit you want to move.",
                cmd: "git log --oneline -5",
                type: "cmd"
            },
            {
                label: "Switch to the correct branch",
                cmd: "git checkout correct-branch-name",
                type: "cmd"
            },
            {
                label: "Cherry-pick — copy that commit onto the correct branch",
                desc: "Replace 'a1b2c3d' with the actual ID you copied in step 2:",
                cmd: "git cherry-pick a1b2c3d",
                type: "cmd"
            },
            {
                label: "Go back to the wrong branch and remove the commit from it",
                desc: "This removes the commit but keeps the code changes in case you need them:",
                cmd: "git checkout wrong-branch-name\ngit reset --soft HEAD~1",
                type: "cmd"
            },
            {
                label: "Verify the commit is now on the right branch",
                cmd: "git checkout correct-branch-name\ngit log --oneline -3",
                type: "cmd"
            }
        ]
    },
    {
        id: "forgot-file",
        emoji: "🤦",
        title: "I committed but forgot to include a file",
        steps: [
            {
                label: "Good news — this is a quick, easy fix",
                desc: "If you just committed and immediately realize a file is missing, you can update (amend) the last commit to include it. No need to make a whole separate commit.",
                type: "info"
            },
            {
                label: "Stage the file you forgot",
                desc: "Replace 'forgotten-file.js' with the actual filename:",
                cmd: "git add forgotten-file.js",
                type: "cmd"
            },
            {
                label: "Amend the last commit to include the newly staged file",
                desc: "The --no-edit flag keeps your original commit message unchanged:",
                cmd: "git commit --amend --no-edit",
                type: "cmd"
            },
            {
                label: "If you already pushed to GitHub, you'll need to force push",
                desc: "Only do this if you're the only one working on this branch:",
                cmd: "git push --force",
                type: "cmd",
                warning:
                    "Never force push on a shared branch — it will overwrite your teammates' work and cause serious problems."
            }
        ]
    },
    {
        id: "cant-push",
        emoji: "🚫",
        title: "My push is being rejected / won't go through",
        steps: [
            {
                label: "The most common reason: GitHub has newer commits than you do",
                desc: "Git won't let you push if GitHub is 'ahead' of your local version. It's protecting you from accidentally overwriting new work. You need to download those new commits first.",
                type: "info"
            },
            { label: "Pull the latest changes from GitHub", cmd: "git pull", type: "cmd" },
            {
                label: "If that causes a conflict, resolve it",
                desc: "Follow the 'I have a merge conflict' steps above, then commit the resolution. Then try pushing again.",
                type: "info"
            },
            { label: "Try pushing again", cmd: "git push", type: "cmd" },
            {
                label: "First push ever on this branch? Use this command instead",
                desc: "If you've never pushed this branch before, Git needs you to set up tracking:",
                cmd: "git push -u origin main",
                type: "cmd"
            },
            {
                label: "Check that your project is connected to GitHub at all",
                desc: "If you see nothing here, your project has no remote connection and that's why push fails:",
                cmd: "git remote -v",
                type: "cmd"
            },
            {
                label: "If no remote exists, add it",
                desc: "Go to GitHub.com, copy your repo URL, then run:",
                cmd: "git remote add origin https://github.com/yourusername/your-repo.git\ngit push -u origin main",
                type: "cmd"
            }
        ]
    },
    {
        id: "detached-head",
        emoji: "😵",
        title: 'Terminal says "detached HEAD state"',
        steps: [
            {
                label: "What does 'detached HEAD' actually mean?",
                desc: "This sounds terrifying but it's not dangerous. HEAD is Git's name for 'the thing I'm currently looking at.' Normally HEAD points to a branch (like main). In 'detached HEAD' state, HEAD is pointing directly to a specific old commit — not a branch. You're basically time-traveling to look at old code. If you make commits here, they're in limbo — not on any branch — and could disappear when you switch away.",
                type: "info"
            },
            {
                label: "If you just want to get back to normal — run this",
                desc: "This snaps you back to your main branch and everything returns to normal:",
                cmd: "git checkout main",
                type: "cmd"
            },
            {
                label: "If you made changes you want to keep — save them to a new branch FIRST",
                desc: "Before switching away, capture your work so it doesn't disappear:",
                cmd: "git checkout -b my-recovery-branch",
                type: "cmd"
            },
            {
                label: "Then merge that saved branch into main",
                cmd: "git checkout main\ngit merge my-recovery-branch",
                type: "cmd"
            },
            { label: "Confirm you're back to normal", cmd: "git branch\ngit status", type: "cmd" }
        ]
    },
    {
        id: "undo-commit",
        emoji: "⏪",
        title: "I want to undo my last commit",
        steps: [
            {
                label: "Two options — choose based on whether you want to keep the code",
                desc: "Option A keeps your code changes but removes the commit record. Option B erases both the commit AND the code changes. When in doubt, always choose Option A.",
                type: "info"
            },
            {
                label: "Option A — Safe: Undo the commit but KEEP your code",
                desc: "Your files stay unchanged. The commit is just un-done. You'll see all those changes back as staged files, ready to recommit.",
                cmd: "git reset --soft HEAD~1",
                type: "cmd"
            },
            {
                label: "Option B — Destructive: Undo the commit AND DELETE the code",
                desc: "This wipes the commit AND reverts your files to before that commit. Only use if you are completely sure you don't want that code.",
                cmd: "git reset --hard HEAD~1",
                type: "cmd",
                warning:
                    "This permanently deletes your code. There is no Ctrl+Z. Only use if you're 100% certain you don't need that work."
            },
            {
                label: "Already pushed to GitHub? You'll need to force push",
                desc: "After resetting locally, force push to update GitHub too:",
                cmd: "git push --force",
                type: "cmd",
                warning:
                    "Never force push on a shared branch — it rewrites history for everyone else on the project."
            }
        ]
    },
    {
        id: "lost-changes",
        emoji: "💨",
        title: "My code changes disappeared",
        steps: [
            {
                label: "Stop and breathe — Git almost never truly deletes things",
                desc: "Before panicking, know that Git is actually very good at keeping things. Your code is most likely on a different branch, in a stash, or in the reflog. Let's find it.",
                type: "info"
            },
            {
                label: "Check git status — changes might just be unstaged",
                cmd: "git status",
                type: "cmd"
            },
            {
                label: "Check if you accidentally switched branches",
                desc: "Your changes might be sitting on a different branch. Look for anything unfamiliar:",
                cmd: "git branch",
                type: "cmd"
            },
            {
                label: "Check your stash — you might have stashed the changes",
                cmd: "git stash list",
                type: "cmd"
            },
            { label: "If stash has your work, retrieve it", cmd: "git stash pop", type: "cmd" },
            {
                label: "Check the reflog — Git's secret complete history",
                desc: "This shows every state your project has ever been in. Scan for a point where your code existed:",
                cmd: "git reflog",
                type: "cmd"
            },
            {
                label: "If you find your code in the reflog, recover it",
                desc: "Replace 'abc1234' with the ID shown in the reflog for the state where your code existed:",
                cmd: "git checkout abc1234\ngit checkout -b recovered-work",
                type: "cmd"
            },
            {
                label: "Also check VS Code's Local History",
                desc: "VS Code automatically saves file snapshots even outside of Git. Right-click a file in the Explorer panel → Open Timeline. You can browse and restore previous versions of individual files — completely independent of Git.",
                type: "tip"
            }
        ]
    }
];

// ─── CATEGORY STYLES ─────────────────────────────────────────────────────────

const CAT_COLORS = {
    Setup: { bg: "#1e1b4b", border: "#4338ca", text: "#a5b4fc", dot: "#6366f1" },
    "Saving Work": { bg: "#14532d", border: "#16a34a", text: "#86efac", dot: "#22c55e" },
    "GitHub (Remote)": { bg: "#0c2a4a", border: "#1d4ed8", text: "#93c5fd", dot: "#3b82f6" },
    Branches: { bg: "#2d1a0a", border: "#b45309", text: "#fcd34d", dot: "#f59e0b" },
    "Inspecting & Comparing": { bg: "#1a1a2e", border: "#7c3aed", text: "#d8b4fe", dot: "#a855f7" },
    "Fixing Mistakes": { bg: "#2d0a0a", border: "#dc2626", text: "#fca5a5", dot: "#ef4444" },
    "VS Code & Terminal Tips": { bg: "#0a2a2a", border: "#0d9488", text: "#5eead4", dot: "#14b8a6" }
};

const ALL_CATEGORIES = [
    "All",
    "Setup",
    "Saving Work",
    "GitHub (Remote)",
    "Branches",
    "Inspecting & Comparing",
    "Fixing Mistakes",
    "VS Code & Terminal Tips"
];

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
    const [tab, setTab] = useState("commands");
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#080d08",
                color: "white",
                fontFamily: "'Courier New', monospace"
            }}>
            {/* Header */}
            <div
                style={{
                    background: "linear-gradient(180deg, #0d150d 0%, #080d08 100%)",
                    borderBottom: "1px solid #162016",
                    padding: "20px 28px 0 28px"
                }}>
                <div style={{ maxWidth: 980, margin: "0 auto" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            marginBottom: 18
                        }}>
                        <span style={{ fontSize: 38 }}>🐙</span>
                        <div>
                            <h1
                                style={{
                                    fontSize: 24,
                                    fontWeight: 900,
                                    color: "#4ade80",
                                    margin: 0,
                                    letterSpacing: -0.5
                                }}>
                                Git & GitHub Cheat Sheet
                            </h1>
                            <p style={{ margin: 0, color: "#2d5a2d", fontSize: 12, marginTop: 2 }}>
                                Era Academy · Interactive Reference · 37 Commands + Problem Solver
                            </p>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 0, borderBottom: "none" }}>
                        {[
                            { id: "commands", label: "📋  Command Reference" },
                            { id: "problems", label: "🔧  Problem Solver" }
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                style={{
                                    padding: "10px 22px",
                                    border: "none",
                                    borderBottom:
                                        tab === t.id
                                            ? "2px solid #4ade80"
                                            : "2px solid transparent",
                                    background: "transparent",
                                    color: tab === t.id ? "#4ade80" : "#2d5a2d",
                                    cursor: "pointer",
                                    fontSize: 13,
                                    fontFamily: "'Courier New', monospace",
                                    fontWeight: tab === t.id ? 700 : 400
                                }}>
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 20px" }}>
                {tab === "commands" ? <CommandsTab /> : <ProblemsTab />}
            </div>
        </div>
    );
}

// ─── COMMANDS TAB ────────────────────────────────────────────────────────────

function CommandsTab() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [expanded, setExpanded] = useState(null);
    const [copied, setCopied] = useState(null);

    const filtered = COMMANDS.filter((c) => {
        const matchCat = category === "All" || c.category === category;
        const q = search.toLowerCase();
        const matchSearch =
            !search ||
            c.command.toLowerCase().includes(q) ||
            c.plain.toLowerCase().includes(q) ||
            c.explain.toLowerCase().includes(q);
        return matchCat && matchSearch;
    });

    const copy = (text, id) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(id);
            setTimeout(() => setCopied(null), 1800);
        });
    };

    const categoryOrder = [
        "Setup",
        "Saving Work",
        "GitHub (Remote)",
        "Branches",
        "Inspecting & Comparing",
        "Fixing Mistakes",
        "VS Code & Terminal Tips"
    ];
    const displayCats = category === "All" ? categoryOrder : [category];

    return (
        <div>
            {/* Search */}
            <input
                placeholder="🔍  Search any command or keyword..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCategory("All");
                }}
                style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "11px 16px",
                    borderRadius: 10,
                    border: "1px solid #162016",
                    background: "#0d150d",
                    color: "#4ade80",
                    fontSize: 14,
                    fontFamily: "'Courier New', monospace",
                    outline: "none",
                    marginBottom: 16
                }}
            />

            {/* Category filters */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 }}>
                {ALL_CATEGORIES.map((cat) => {
                    const col = cat === "All" ? null : CAT_COLORS[cat];
                    const active = category === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            style={{
                                padding: "6px 13px",
                                borderRadius: 20,
                                border: `1px solid ${active ? (col ? col.border : "#4ade80") : "#162016"}`,
                                background: active ? (col ? col.bg : "#14532d") : "#0d150d",
                                color: active ? (col ? col.text : "#4ade80") : "#2d5a2d",
                                cursor: "pointer",
                                fontSize: 11,
                                fontFamily: "'Courier New', monospace",
                                fontWeight: active ? 700 : 400
                            }}>
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* Command groups */}
            {displayCats.map((cat) => {
                const items = filtered.filter((c) => c.category === cat);
                if (!items.length) return null;
                const col = CAT_COLORS[cat];
                return (
                    <div key={cat} style={{ marginBottom: 36 }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 12
                            }}>
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: col.dot,
                                    flexShrink: 0
                                }}
                            />
                            <span
                                style={{
                                    color: col.text,
                                    fontWeight: 800,
                                    fontSize: 13,
                                    letterSpacing: 1
                                }}>
                                {cat.toUpperCase()}
                            </span>
                            <span style={{ color: "#1a2a1a", fontSize: 12 }}>
                                ({items.length} commands)
                            </span>
                            <div
                                style={{
                                    flex: 1,
                                    height: 1,
                                    background: col.border,
                                    opacity: 0.25
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {items.map((cmd) => (
                                <CommandCard
                                    key={cmd.id}
                                    cmd={cmd}
                                    expanded={expanded}
                                    setExpanded={setExpanded}
                                    copied={copied}
                                    copy={copy}
                                    col={col}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}

            {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#2d5a2d" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                    <div style={{ fontSize: 15 }}>No commands found for "{search}"</div>
                    <div style={{ fontSize: 13, marginTop: 6 }}>
                        Try different keywords like "push", "undo", or "branch"
                    </div>
                </div>
            )}
        </div>
    );
}

function CommandCard({ cmd, expanded, setExpanded, copied, copy, col }) {
    const isOpen = expanded === cmd.id;
    return (
        <div
            style={{
                border: `1px solid ${isOpen ? col.border : "#162016"}`,
                borderRadius: 10,
                background: isOpen ? "#0a120a" : "#080d08",
                overflow: "hidden",
                transition: "border-color 0.2s"
            }}>
            <div
                onClick={() => setExpanded(isOpen ? null : cmd.id)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 16px",
                    cursor: "pointer",
                    userSelect: "none"
                }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{cmd.emoji}</span>
                <code
                    style={{
                        background: "#050d05",
                        border: "1px solid #162016",
                        borderRadius: 5,
                        padding: "3px 9px",
                        fontSize: 12,
                        color: "#4ade80",
                        flexShrink: 0,
                        maxWidth: "42%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                    }}>
                    {cmd.command}
                </code>
                <span
                    style={{
                        color: "#4b7a5a",
                        fontSize: 13,
                        flex: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: isOpen ? "normal" : "nowrap"
                    }}>
                    {cmd.plain}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        copy(cmd.command, cmd.id);
                    }}
                    style={{
                        background: copied === cmd.id ? "#14532d" : "#0d150d",
                        border: `1px solid ${copied === cmd.id ? "#16a34a" : "#162016"}`,
                        color: copied === cmd.id ? "#86efac" : "#2d5a2d",
                        borderRadius: 5,
                        padding: "3px 9px",
                        fontSize: 11,
                        cursor: "pointer",
                        fontFamily: "'Courier New', monospace",
                        flexShrink: 0,
                        whiteSpace: "nowrap"
                    }}>
                    {copied === cmd.id ? "✓ Copied!" : "Copy"}
                </button>
                <span style={{ color: "#1a3a1a", fontSize: 11, flexShrink: 0 }}>
                    {isOpen ? "▲" : "▼"}
                </span>
            </div>

            {isOpen && (
                <div
                    style={{
                        borderTop: "1px solid #162016",
                        padding: "18px 20px",
                        background: "#060c06"
                    }}>
                    {/* What it does */}
                    <div style={{ marginBottom: 18 }}>
                        <div
                            style={{
                                fontSize: 10,
                                letterSpacing: 2.5,
                                color: col.text,
                                textTransform: "uppercase",
                                fontWeight: 800,
                                marginBottom: 10,
                                opacity: 0.7
                            }}>
                            What it does — in plain English
                        </div>
                        <p style={{ color: "#8aab8a", fontSize: 13.5, lineHeight: 2, margin: 0 }}>
                            {cmd.explain}
                        </p>
                    </div>

                    {/* VS Code tip */}
                    {cmd.vscode && (
                        <div
                            style={{
                                background: "#0a1a1a",
                                border: "1px solid #0d9488",
                                borderRadius: 8,
                                padding: "12px 15px",
                                marginBottom: 14
                            }}>
                            <div
                                style={{
                                    fontSize: 10,
                                    letterSpacing: 2.5,
                                    color: "#5eead4",
                                    textTransform: "uppercase",
                                    fontWeight: 800,
                                    marginBottom: 8
                                }}>
                                💻 Doing this in VS Code
                            </div>
                            <p
                                style={{
                                    color: "#99f6e4",
                                    fontSize: 13,
                                    lineHeight: 1.85,
                                    margin: 0
                                }}>
                                {cmd.vscode}
                            </p>
                        </div>
                    )}

                    {/* When to use */}
                    <div style={{ marginBottom: cmd.warning ? 14 : 0 }}>
                        <div
                            style={{
                                fontSize: 10,
                                letterSpacing: 2.5,
                                color: col.text,
                                textTransform: "uppercase",
                                fontWeight: 800,
                                marginBottom: 8,
                                opacity: 0.7
                            }}>
                            When to use it
                        </div>
                        <p style={{ color: "#4ade80", fontSize: 13, lineHeight: 1.85, margin: 0 }}>
                            {cmd.when}
                        </p>
                    </div>

                    {/* Warning */}
                    {cmd.warning && (
                        <div
                            style={{
                                background: "#180f00",
                                border: "1px solid #b45309",
                                borderRadius: 8,
                                padding: "11px 14px",
                                marginTop: 14
                            }}>
                            <span style={{ color: "#fbbf24", fontWeight: 800, fontSize: 12 }}>
                                ⚠️ Watch out:{" "}
                            </span>
                            <span style={{ color: "#fde68a", fontSize: 13 }}>{cmd.warning}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── PROBLEMS TAB ────────────────────────────────────────────────────────────

function ProblemsTab() {
    const [selected, setSelected] = useState(null);
    const [copied, setCopied] = useState(null);

    const copy = (text, id) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(id);
            setTimeout(() => setCopied(null), 1800);
        });
    };

    if (selected) {
        const p = PROBLEMS.find((x) => x.id === selected);
        return (
            <div>
                <button
                    onClick={() => setSelected(null)}
                    style={{
                        background: "#0d150d",
                        border: "1px solid #162016",
                        color: "#4ade80",
                        borderRadius: 8,
                        padding: "7px 15px",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "'Courier New', monospace",
                        marginBottom: 24
                    }}>
                    ← Back to all problems
                </button>

                <div
                    style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 6 }}>
                    <span style={{ fontSize: 44 }}>{p.emoji}</span>
                    <div>
                        <h2
                            style={{
                                fontSize: 22,
                                fontWeight: 900,
                                color: "#4ade80",
                                margin: 0,
                                lineHeight: 1.3
                            }}>
                            {p.title}
                        </h2>
                        <p style={{ color: "#2d5a2d", fontSize: 13, margin: "6px 0 0 0" }}>
                            Follow each step in order. Don't skip ahead.
                        </p>
                    </div>
                </div>

                <div style={{ marginTop: 28 }}>
                    {p.steps.map((step, i) => {
                        const typeStyle = {
                            cmd: { numBg: "#14532d", numBorder: "#16a34a", numColor: "#86efac" },
                            info: { numBg: "#0c2a4a", numBorder: "#1d4ed8", numColor: "#93c5fd" },
                            tip: { numBg: "#1e1b4b", numBorder: "#4338ca", numColor: "#a5b4fc" }
                        }[step.type] || { numBg: "#1a1a1a", numBorder: "#333", numColor: "white" };

                        return (
                            <div key={i} style={{ display: "flex", gap: 0, marginBottom: 0 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        marginRight: 14,
                                        flexShrink: 0
                                    }}>
                                    <div
                                        style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: "50%",
                                            background: typeStyle.numBg,
                                            border: `2px solid ${typeStyle.numBorder}`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 900,
                                            fontSize: 12,
                                            color: typeStyle.numColor
                                        }}>
                                        {i + 1}
                                    </div>
                                    {i < p.steps.length - 1 && (
                                        <div
                                            style={{
                                                width: 1,
                                                flex: 1,
                                                minHeight: 12,
                                                background: "#162016",
                                                margin: "3px 0"
                                            }}
                                        />
                                    )}
                                </div>
                                <div style={{ flex: 1, paddingBottom: 22 }}>
                                    <div
                                        style={{
                                            fontWeight: 800,
                                            color: "white",
                                            fontSize: 14,
                                            marginBottom: 6
                                        }}>
                                        {step.label}
                                    </div>
                                    {step.desc && (
                                        <p
                                            style={{
                                                color: "#6b9b7a",
                                                fontSize: 13,
                                                lineHeight: 1.85,
                                                margin: "0 0 10px 0",
                                                whiteSpace: "pre-line"
                                            }}>
                                            {step.desc}
                                        </p>
                                    )}
                                    {step.cmd && (
                                        <div style={{ position: "relative" }}>
                                            <pre
                                                style={{
                                                    background: "#030803",
                                                    border: "1px solid #162016",
                                                    borderRadius: 8,
                                                    padding: "12px 14px",
                                                    color: "#4ade80",
                                                    fontSize: 13,
                                                    margin: 0,
                                                    overflowX: "auto",
                                                    lineHeight: 1.8,
                                                    paddingRight: 70
                                                }}>
                                                {step.cmd}
                                            </pre>
                                            <button
                                                onClick={() => copy(step.cmd, `${selected}-${i}`)}
                                                style={{
                                                    position: "absolute",
                                                    top: 8,
                                                    right: 8,
                                                    background:
                                                        copied === `${selected}-${i}`
                                                            ? "#14532d"
                                                            : "#0d150d",
                                                    border: `1px solid ${copied === `${selected}-${i}` ? "#16a34a" : "#162016"}`,
                                                    color:
                                                        copied === `${selected}-${i}`
                                                            ? "#86efac"
                                                            : "#2d5a2d",
                                                    borderRadius: 5,
                                                    padding: "3px 9px",
                                                    fontSize: 11,
                                                    cursor: "pointer",
                                                    fontFamily: "'Courier New', monospace"
                                                }}>
                                                {copied === `${selected}-${i}` ? "✓ Done" : "Copy"}
                                            </button>
                                        </div>
                                    )}
                                    {step.warning && (
                                        <div
                                            style={{
                                                background: "#180f00",
                                                border: "1px solid #b45309",
                                                borderRadius: 7,
                                                padding: "9px 13px",
                                                marginTop: 8
                                            }}>
                                            <span
                                                style={{
                                                    color: "#fbbf24",
                                                    fontWeight: 800,
                                                    fontSize: 12
                                                }}>
                                                ⚠️{" "}
                                            </span>
                                            <span style={{ color: "#fde68a", fontSize: 13 }}>
                                                {step.warning}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div
                    style={{
                        background: "#0d150d",
                        border: "1px solid #162016",
                        borderRadius: 10,
                        padding: "14px 18px"
                    }}>
                    <span style={{ color: "#4ade80", fontWeight: 800 }}>✅ All done? </span>
                    <span style={{ color: "#4b7a5a", fontSize: 13 }}>
                        Run{" "}
                        <code
                            style={{
                                color: "#4ade80",
                                background: "#030803",
                                padding: "1px 5px",
                                borderRadius: 3
                            }}>
                            git status
                        </code>{" "}
                        to confirm your project is in a clean state. Still stuck? Ask your
                        instructor — working through Git problems together is one of the best ways
                        to learn.
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: 28 }}>
                <h2
                    style={{
                        fontSize: 20,
                        fontWeight: 900,
                        color: "#4ade80",
                        margin: "0 0 6px 0"
                    }}>
                    What went wrong?
                </h2>
                <p style={{ color: "#2d5a2d", fontSize: 13, margin: 0 }}>
                    Pick your problem and get a step-by-step walkthrough to fix it.
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                    gap: 10,
                    marginBottom: 32
                }}>
                {PROBLEMS.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setSelected(p.id)}
                        style={{
                            background: "#080d08",
                            border: "1px solid #162016",
                            borderRadius: 12,
                            padding: "18px",
                            cursor: "pointer",
                            textAlign: "left",
                            fontFamily: "'Courier New', monospace",
                            transition: "all 0.15s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#16a34a";
                            e.currentTarget.style.background = "#0a120a";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#162016";
                            e.currentTarget.style.background = "#080d08";
                        }}>
                        <div style={{ fontSize: 30, marginBottom: 10 }}>{p.emoji}</div>
                        <div
                            style={{
                                fontWeight: 700,
                                color: "white",
                                fontSize: 14,
                                marginBottom: 5,
                                lineHeight: 1.4
                            }}>
                            {p.title}
                        </div>
                        <div style={{ color: "#2d5a2d", fontSize: 12 }}>
                            {p.steps.length} steps → tap to fix
                        </div>
                    </button>
                ))}
            </div>

            <div
                style={{
                    background: "#080d08",
                    border: "1px solid #162016",
                    borderRadius: 12,
                    padding: "18px 22px"
                }}>
                <div style={{ fontWeight: 900, color: "#4ade80", marginBottom: 10, fontSize: 14 }}>
                    💡 The Golden Rule — Do These Three Commands First
                </div>
                <div style={{ color: "#4b7a5a", fontSize: 13, lineHeight: 2.1 }}>
                    When ANYTHING feels wrong with Git, always start here before trying to fix
                    anything:
                    <br />
                    <code
                        style={{
                            color: "#4ade80",
                            background: "#030803",
                            padding: "1px 6px",
                            borderRadius: 3
                        }}>
                        git status
                    </code>{" "}
                    — see what state your files are in right now
                    <br />
                    <code
                        style={{
                            color: "#4ade80",
                            background: "#030803",
                            padding: "1px 6px",
                            borderRadius: 3
                        }}>
                        git log --oneline -5
                    </code>{" "}
                    — see what the last few commits were
                    <br />
                    <code
                        style={{
                            color: "#4ade80",
                            background: "#030803",
                            padding: "1px 6px",
                            borderRadius: 3
                        }}>
                        git branch
                    </code>{" "}
                    — confirm you're on the branch you think you're on
                    <br />
                    <br />
                    <span style={{ color: "#2d5a2d" }}>
                        90% of Git confusion disappears once you know the answers to those three
                        questions.
                    </span>
                </div>
            </div>
        </div>
    );
}
