pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('reactbookapp') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                set FRONTEND_PATH="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\reactbookapi"
                
                if exist %FRONTEND_PATH% (
                    rmdir /S /Q %FRONTEND_PATH%
                )
                mkdir %FRONTEND_PATH%
                xcopy /E /I /Y reactbookapp\\dist\\* %FRONTEND_PATH%
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('BookManagement-Backend') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                set BACKEND_WAR_NAME=BookManagement-Backend.war
                set TOMCAT_WEBAPPS="C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps"
                set BACKEND_WAR_PATH=%TOMCAT_WEBAPPS%\\%BACKEND_WAR_NAME%
                set BACKEND_FOLDER=%TOMCAT_WEBAPPS%\\BookManagement-Backend

                REM Stop Tomcat
                "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\catalina.bat" stop

                REM Clean old deployment
                if exist %BACKEND_WAR_PATH% (
                    del /Q %BACKEND_WAR_PATH%
                )
                if exist %BACKEND_FOLDER% (
                    rmdir /S /Q %BACKEND_FOLDER%
                )

                REM Copy new WAR
                copy "BookManagement-Backend\\target\\*.war" %BACKEND_WAR_PATH%

                REM Start Tomcat
                "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\bin\\catalina.bat" start
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
