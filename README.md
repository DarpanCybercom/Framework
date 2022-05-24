# Framework
The Node JS Custom Framework's Custom Commands


# How to Use Commands
- First You Have to Install This Package In Global

    npm i -g @darpanvadher/framework

- Command Lists : 

    1) Init 
        - if you want to Initialize project in current empty Folder.
            
            ```
            framework --init  || framework -i
            ```
            
        - if you want to Initialize Project in New 
            Folder.
            
            ```
            framework --init [FolderName]            || framework -i [FolderName] 
            ```

    2) Add Module 

        ```
        framework addModule [ModuleName]
        ``` 

        This Command Add Basic Files For New Modules.

    3) Add File Upload 

        ``` 
        framework addFileUpload
        ```

        This Command Add File Upload Functionality to perticular Module's Path