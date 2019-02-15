# link-shortener Server
## Installing

```
git clone https://github.com/Koniushok/link-shortener-server.git
cd link-shortener-server
yarn
```
## Important
**You must have a mongodb installed** 
## Initial data
Saving lists of links to the database (optional)
```
yarn seed
```
## Start dev server
```
yarn start
```
## Note
1. Dev Server runs on port 8080 (can change in  ```./config/development.json```).
2. You can use the delay to show the loading animation. ```./config/development.json ``` -->```delay(default 0)```
3. Cors Origin default ```http://localhost:3000``` (can change in  ```./config/development.json```).
