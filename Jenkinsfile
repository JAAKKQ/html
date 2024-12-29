pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('NodeJS LTS'){
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy'){
            steps {
                script {
                    // CHANGE THIS TO THE WEBSITE DOMAIN!
                    def domain = 'karkkainen.net'
                    //____________________________________

                    // ADD THE SERVERS!
                    def devServers = [
                            'HEL-WWW1'
                    ]
                    def prodServers = [
                            ''
                    ]
                    //____________________________________

                    if(env.BRANCH_NAME == 'main'){
                        prodServers.each{ server ->
                            deployProduction(server, domain)
                        }   
                    } else {
                        devServers.each{ server ->
                            deployDevelopment(server, domain)
                        }   
                    }
                }
                sh {
                    'tar -cJvf html.tar.xz -C dist/ .'
                }
            }
        }
    }
}

def deployDevelopment(server, domain){
    stage("Deploying to ${server}"){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                sshTransfer(
                        cleanRemote: false,
                        excludes: '*', 
                        execCommand: "find /var/www/$domain -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +", 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                        removePrefix: 'dist/', 
                        sourceFiles: 'dist/**'
                    ),
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '', 
                        execCommand: "tar -xf html.tar.xz && rm html.tar.xz", 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                        removePrefix: 'dist/', 
                        sourceFiles: 'dist/**'
                    )
                ], 
                usePromotionTimestamp: false, 
                useWorkspaceInPromotion: false, 
                verbose: false
            )
        ]
    }
}

def deployProduction(server, domain){
    stage("Deploying to ${server}"){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '*', 
                        execCommand: "find /var/www/$domain -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +", 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                        removePrefix: 'dist/', 
                        sourceFiles: 'dist/**'
                    ),
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '', 
                        execCommand: "", 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
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