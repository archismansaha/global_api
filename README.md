# env example

```
DATABASE_URL="mongodb+srv://globalapi:globalapi@cluster0.kzfp1.mongodb.net/globalapi?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="secretkey"
REDIS_URL="rediss://default:AWIiAAIjcDEzNDMzODE1NjZlNDM0NmMxYmZiMWI2YzkzZDI3Mzc1YnAxMA@first-finch-25122.upstash.io:6379"

```

# Features :

- Rate Limiting
- Caching  [ Write-through ]
- Used Helemt [For adding security HTTP headers ]
- Logging [ Used winston and write in local file ]

# Global Settings 

![alt text](image.png)

/logs [GET] => To fetch logs

### For sending Notification to mobile with twilio

/notifications [POST] => 

```
{
  "message": "Hello Test!"
}

```
