pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('Recent Node'){
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy'){
            steps {
                deployDevelopment()
            }
        }
    }
}

def deployDevelopment(){
    stage('Deploying to Development'){
        steps {
            sshPublisher failOnError: true, 
            publishers: [
                sshPublisherDesc(
                    configName: 'HEL-WWW-DEV-01', 
                    transfers: [
                        sshTransfer(
                            cleanRemote: true,
                            excludes: '', 
                            execCommand: '', 
                            flatten: false, 
                            makeEmptyDirs: false, 
                            noDefaultExcludes: false, 
                            patternSeparator: '[, ]+', 
                            remoteDirectory: 'karkkainen.net', 
                            remoteDirectorySDF: false, 
                            removePrefix: 'dist/', 
                            sourceFiles: 'dist/**'
                        )
                    ], 
                    usePromotionTimestamp: false, 
                    useWorkspaceInPromotion: false, 
                    verbose: true
                )
            ]
        }
    }
}

def deployProduction(){
    stage('Deploying to Production'){
        steps {
            sshPublisher failOnError: true, 
            publishers: [
                sshPublisherDesc(
                    configName: 'HEL-WWW-PROD-01', 
                    transfers: [
                        sshTransfer(
                            cleanRemote: true,
                            excludes: '', 
                            execCommand: '', 
                            flatten: false, 
                            makeEmptyDirs: false, 
                            noDefaultExcludes: false, 
                            patternSeparator: '[, ]+', 
                            remoteDirectory: 'karkkainen.net', 
                            remoteDirectorySDF: false, 
                            removePrefix: 'dist/', 
                            sourceFiles: 'dist/**'
                        )
                    ], 
                    usePromotionTimestamp: false, 
                    useWorkspaceInPromotion: false, 
                    verbose: true
                )
            ]
        }
    }
}