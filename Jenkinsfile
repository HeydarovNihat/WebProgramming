
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

        stage('Build Angular Application') {
            steps {
                bat 'npm run build'
            }
        }
    }

    post {
        success {
            echo 'Angular application built successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
