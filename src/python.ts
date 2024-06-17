import path from 'path';
import {Options, PythonShell} from 'python-shell';



export function callPython(forms:string[],blocks:string[]) {

   
    let options:Options = {
        mode: 'text',
        //pythonPath: 'C:/Python39',
        pythonOptions: ['-u'], // get print results in real-time
        //scriptPath: '/home/ubuntu/navi_server/navi_assistant_server/build/dr_appinventor',
        scriptPath:path.join(__dirname,'../dr_appinventor'),
        //scriptPath: '/home/rubenbp/Documentos/navi_assistant_server/build/dr_appinventor',
        args: ["["+forms.toString()+"]", blocks.toString()]
      };
      //Al devolverlo como una promesa yo decido cuando ejecutar ese script sin estar limitado 
      return new Promise((resolve,reject)=>{

        PythonShell.run('data_analysis.py', options, async function (err, results) {
          if (err) reject(err);
          resolve(results);
          
        });

      });
      // PythonShell.run('data_analysis.py', options, async function (err, results) {
      //   if (err) throw err;
      //   // results is an array consisting of messages collected during execution

      //   console.log('results: %j', results);

      //   //TODO rescatar el texto resultante de la consulta con dialogflow y ponerle tambien como campo de entrada el resultado del analisis
      //   //TODO mejor que esta funcion no haga el await y que el socket emita desde dialogflow
      //   await runSample(sessionId);

      //   //TODO mover el socket a dialogflow.ts y que emita cuando obtenga la respuesta de dialog
      //   socket.emit('from_server',"TO MI COÑO");
      // });
    
}