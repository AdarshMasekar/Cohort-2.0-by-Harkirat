# Git Basics to Advanced

## What is Git?
Git is a distributed version control system that tracks changes in source code during software development. It's designed for coordinating work among programmers, but it can be used to track changes in any set of files.

## What is Version Control?
Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later.

## Types of Version Control:
1. Centralized Version Control System (CVCS)
   - Single central server storing all versioned files
   - Clients check out files from this central place
   - Examples: SVN, Perforce

2. Distributed Version Control System (DVCS)
   - Clients fully mirror the repository, including its full history
   - Every clone is a full backup
   - Examples: Git, Mercurial

## Why Git?
- Free and open source
- Fast and efficient performance
- Scalable for both small and large projects
- Strong support for non-linear development (branching)
- Fully distributed architecture
- Helps you manage projects of any size
- Excellent data integrity and security

## What is GitHub?
GitHub is a cloud-based hosting service that allows you to manage Git repositories. It provides:
- Collaborative features for team development
- Web interface for repository management
- Project management tools
- Team management capabilities
- User access control
- Additional features like Issues, Pull Requests, and Actions

## Essential Git Commands

### Repository Setup
`git init`
- Initializes a new Git repository
- Creates a new .git directory in your project
- Starts tracking the project directory

`git clone [url]`
- Creates a copy of a remote repository on your local machine
- Downloads all files, branches, and commit history

### Basic Snapshotting
`git add [file(s)]`
- Adds files to the staging area
- Prepares files for commit
- Use `git add .` to stage all changes

`git commit -m "message"`
- Records staged changes to the repository
- Creates a new commit with a descriptive message
- Permanently stores changes in the repository

### Synchronization
`git push [remote] [branch]`
- Uploads local repository content to a remote repository
- Pushes commits to share with others
- Example: `git push origin main`

`git pull [remote] [branch]`
- Fetches changes from remote repository
- Automatically merges remote changes into current branch
- Combines `git fetch` and `git merge`

### Inspection
`git status`
- Shows the status of working directory
- Displays staged, unstaged, and untracked files
- Indicates current branch

### Branching
`git branch`
- Lists all local branches
- Create new branch: `git branch [branch-name]`
- Delete branch: `git branch -d [branch-name]`

`git checkout [branch-name]`
- Switches to specified branch
- Updates working directory to match branch
- Use `-b` flag to create and switch: `git checkout -b [new-branch]`

`git merge [branch]`
- Combines specified branch into current branch
- Integrates changes from one branch to another
- Creates a merge commit (unless fast-forward)

### History
`git log`
- Shows commit history
- Displays author, date, and commit messages
- Various options for formatting output
- Use `git log --oneline` for compact view
