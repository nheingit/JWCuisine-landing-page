const name = 'JWCuisineServerApi' // Name to use in PM2
const repo = 'https://github.com/nheingit/JWCuisine-landing-page.git' // Link to your repo
const user = 'root' // Server user
const path = `/home/${user}/${name}` // Path on the server to deploy to
const host = '165.22.188.205' // Server hostname
const port = 4000 // Port to use locally on the server
const build = 'yarn install && yarn tsc' // Build commands

module.exports = {
  apps: [
    {
      name,
      node_args: '-r dotenv/config',
      cwd: `${path}/current/`,
      script: 'build/index.js',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user,
      host,
      ref: 'origin/main',
      repo,
      path,
      ssh_options: 'ForwardAgent=yes',
      'post-deploy': `${build} && pm2 reload pm2.config.js --env production && pm2 save --env production`,
    },
  },
}