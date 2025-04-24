pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    environment {
        CHROME_BIN = '/usr/bin/google-chrome'  // Adjust path if different
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
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

        stage('Run End-2-End Tests') {
            steps {
                sh 'npm run serve'
                sh 'npm run e2e:headless'
            }
        }
    }
    post {
            always {
                junit 'build/reports/**/*.xml'
            }
        }
}
