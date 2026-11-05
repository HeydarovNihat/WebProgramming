
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build Angular') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Start Angular') {
            steps {
                bat 'start /B npm start -- --host 127.0.0.1 > angular.log 2>&1'
                bat 'npx wait-on http://127.0.0.1:4200'
            }
        }

        stage('Selenium Tests') {
            steps {
                bat 'npm run test:e2e'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'mochawesome-report/**, angular.log',
                             allowEmptyArchive: true
        }

        success {
            echo 'Build and Selenium tests completed!'
        }

        failure {
            echo 'Build or Selenium tests failed!'
        }
    }
}
