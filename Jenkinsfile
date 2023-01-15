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
        stage('Init') {
            steps {
                 sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'


                }
            }
        
        stage('Test') {
            steps {
                sh 'cd EmployeeManagementApp && npm run test'
                sh 'cd GestionProduit-V && mvn test'
            }
        }
        stage('Build') {
            steps {
                sh 'cd EmployeeManagementApp && docker build -t frontend:latest .'
                sh 'cd GestionProduit-V && docker build -t backend:latest .'
            }
        }
        stage('Deliver') {
            steps {
                sh 'docker push gazzehamine/frontend:latest'
                sh 'docker push gazzehamine/backend:latest'
            }
        }
        stage('Cleanup') {
            steps {
                sh 'docker system prune -f'
                sh 'docker logout'
            }
        }
    }

}