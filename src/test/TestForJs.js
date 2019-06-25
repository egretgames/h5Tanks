let sourceData = [{time:23423423423,command:"F20901020304050607F20901020304050607F20901020304050607"},{time:23425423423,command:"F20901020304050607"},{time:23425423423,command:"F20901020304050607"}]
let sourceCommandList =[];

function commandCreater(comStr){

}
function commandProgress(commandStr){
    while(true){

    }
}

function sourceDataProgress(data){
    let time;
    let command;
    for(let i=0;i<data.length;i++){
        time = data[i].time;
        command = data[i].command;
        commandProgress(command);
    }
}
