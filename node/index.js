const express = require('express')
const { Translate } = require('@google-cloud/translate').v2
const app = express()
const port = 4000
const translate = new Translate();

app.get('/', async (req, res) => {
  const { target, text } = req.query;
  if(!target || !text){
    return res.status(403).json({"success": false, "message": 'Bad input'});
  }
  const translation = await translateText(target, text);
  if(translation){
    return res.status(200).json({"success": true, "message": translation});
  }
  return res.status(500).json({"success": false, "message": 'cant translate'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function translateText(target, text) {
    try{
        let [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations) ? translations : [translations];
        return translations[0];
    }
    catch(e){
        console.log('error: ', e)
        return null;
    }

  }