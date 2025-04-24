pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        CHROME_BIN = '/usr/bin/google-chrome'  // Adjust path if different
    }

    stages {
        stage('Clone repo') {
            steps {
                git url: 'https://github.com/St-Cloud-State-University-org/ExpenseTracker670.git',
                    branch: 'main',
                    credentialsId: 'd5483b8e-cfa6-4ea9-8d83-be36d73a2b0e'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'echo $CHROME_BIN'   
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm run test:headless'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run End-2-End Tests') {
            steps {
                sh 'npm run serve'
                sh 'npm run e2e:headless'
            }
        }
        
        post {
            always {
                junit 'build/reports/**/*.xml'
            }
        }
    }
}
