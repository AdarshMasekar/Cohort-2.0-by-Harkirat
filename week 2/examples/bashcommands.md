# Bash Commands Reference

This document provides explanations for essential Bash commands commonly used for navigating and managing files, as well as working with JavaScript-related tools. These commands are useful for both beginners and experienced developers.

---

## **File System Navigation and Management**

### **pwd**
- **Command**: `pwd`
- **Description**: Prints the current working directory, showing the absolute path to the folder you are in.
- **Usage**:  
  ```bash
  pwd
  ```
  Example output: `/home/user/project`

### **cd**
- **Command**: `cd`
- **Description**: Changes the current directory.
- **Usage**:
  ```bash
  cd /path/to/directory
  cd ..  # Moves up one level
  cd ~   # Moves to the home directory
  ```

### **ls**
- **Command**: `ls`
- **Description**: Lists the files and directories in the current directory.
- **Options**:
  - `ls -l`: Detailed listing with file permissions, size, and modification time.
  - `ls -a`: Shows hidden files (files starting with a dot `.`).
- **Usage**:
  ```bash
  ls
  ls -la
  ```

### **mkdir**
- **Command**: `mkdir`
- **Description**: Creates a new directory.
- **Usage**:
  ```bash
  mkdir new_directory
  ```
  Use `mkdir -p` to create nested directories:
  ```bash
  mkdir -p parent_directory/child_directory
  ```

### **touch**
- **Command**: `touch`
- **Description**: Creates an empty file or updates the timestamp of an existing file.
- **Usage**:
  ```bash
  touch new_file.txt
  ```

### **cat**
- **Command**: `cat`
- **Description**: Displays the contents of a file, concatenates files, or redirects file contents.
- **Usage**:
  ```bash
  cat file.txt
  cat file1.txt file2.txt > combined.txt
  ```

### **vi**
- **Command**: `vi`
- **Description**: Opens the `vi` text editor to view or edit a file. It is a powerful editor for working in the terminal.
- **Basic Commands in vi**:
  - Press `i` to enter insert mode (to edit text).
  - Press `Esc` to exit insert mode.
  - Type `:w` to save changes.
  - Type `:q` to quit.
  - Type `:wq` to save and quit.
- **Usage**:
  ```bash
  vi file.txt
  ```

### **mv**
- **Command**: `mv`
- **Description**: Moves or renames files and directories.
- **Usage**:
  ```bash
  mv old_name.txt new_name.txt  # Rename
  mv file.txt /path/to/destination  # Move file
  ```

### **cp**
- **Command**: `cp`
- **Description**: Copies files and directories.
- **Options**:
  - `cp -r`: Copies directories recursively.
- **Usage**:
  ```bash
  cp file.txt /path/to/destination
  cp -r folder/ /path/to/destination
  ```

---

## **JavaScript Development Tools**

### **nvm**
- **Command**: `nvm`
- **Description**: Node Version Manager (NVM) is a tool to manage multiple Node.js versions on a system.
- **Usage**:
  ```bash
  nvm install node  # Installs the latest Node.js version
  nvm use 14        # Switches to Node.js version 14
  nvm ls            # Lists installed Node.js versions
  ```

### **npm**
- **Command**: `npm`
- **Description**: Node Package Manager (NPM) is used for managing JavaScript packages and dependencies.
- **Usage**:
  ```bash
  npm init          # Initializes a new Node.js project
  npm install pkg   # Installs a package locally
  npm install -g pkg # Installs a package globally
  ```

### **node**
- **Command**: `node`
- **Description**: Runs Node.js scripts and interactive JavaScript code.
- **Usage**:
  ```bash
  node script.js    # Runs a JavaScript file
  node              # Opens the interactive REPL (Read-Eval-Print Loop)
  ```


