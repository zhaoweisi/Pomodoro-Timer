# google oauth

## Step1 - set up google oauth 

1. Go to the Google Project Dashboard: https://console.cloud.google.com
2. Click the "Create Project" button 
3. Name the project and click the "Create" button                                                          
4. Click the menu button, Select "APIs & Services", then "OAuth Consent Screen"               

5. Select "External" and click the "Create" button

6. Fill out "Application Name", scroll to the bottom and click the "Save" button. No other info should be filled out in the consent screen at this time.

7. Click "Credentials" in the sidebar and then click the "Create Credentials" button

8. Select "OAuth Client ID"

9. Select Web Application and fill out the "Authorized JavaScript Origins" and "Authorized redirect URI" and click the "Create" button.

	Authorized JavaScript Origins:

	http://localhost:8080

	Authorized redirect URI

	http://localhost:8080/auth/google/callback                                                                                  
10. Copy your Client ID and Client Secret in a safe place so you can use it in your application in a future lecture. (ID and Secret were redacted from the screenshot)


## Step2 - edit file
In file `keys.js` 
change `googleClientID` from last steps
change `googleClientSecret` from last steps
change `mongoURL`
change `cookieKey` from last steps

## Step3 - run
```
npm run dev
```
