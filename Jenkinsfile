pipeline {
    agent any
      environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/gazzehamine1/DevOps', branch: 'main'
            }
        }
        stage('Init'){
            steps{
                bat 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        
        stage('Test') {
            steps {
                bat 'cd EmployeeManagementApp && npm run test'
                bat 'cd GestionProduit-V && mvn test'
            }
        }
        stage('Build') {
            steps {
                bat 'cd EmployeeManagementApp && docker build -t frontend:latest .'
                bat 'cd GestionProduit-V && docker build -t backend:latest .'
            }
        }
        stage('Deliver') {
            steps {
                bat 'docker push gazzehamine/frontend:latest'
                bat 'docker push gazzehamine/backend:latest'
            }
        }
        stage('Cleanup') {
            steps {
                bat 'docker system prune -f'
                bat 'docker logout'
            }
        }
    }

}
