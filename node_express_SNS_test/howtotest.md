### 테스트 방법
1. 단위 / 통합 테스트  
터미널에서 npm test       

2. 커버리지  
터미널에서 npm run coverage 입력  
   
3. 부하테스트  
  터미널에서 npx artillery quick --count 100 -n 50 http://localhost:8001 입력  

4. 부하테스트(시나리오)  
\- 시나리오 작성 : json, yaml형식으로 loadtest작성  
\- 터미널에서 npx artillery run loadtest.yml 입력

