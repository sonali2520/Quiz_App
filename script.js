const start_button=document.querySelector(".start_btn button");

const info_box=document.querySelector(".info_box");

const quiz_box=document.querySelector(".quiz_box");

const exit_btn=info_box.querySelector(".buttons .quit");

const continue_btn=info_box.querySelector(".buttons .restart");

const option_list=document.querySelector(".option_list");

const timeCount=quiz_box.querySelector(".timer .timer_sec");

const timeLine=quiz_box.querySelector("header .time_line");

start_button.onclick= ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter();
    startTimer(15);
    startTimerLine(0);
}

let que_count=0;
let counter;
let counterLine;
let num_correct=0;

const next_btn=quiz_box.querySelector(".next_btn");
const result_box=document.querySelector(".result_box");
const restart_quiz=result_box.querySelector(".buttons .restart");
const quit_quiz=result_box.querySelector(".buttons .quit");

quit_quiz.onclick=()=>{
    window.location.reload();
}

restart_quiz.onclick=()=>{
    result_box.classList.remove("activeResult");
    quiz_box.classList.add("activeQuiz");
    que_count=0;
    num_correct=0
    showQuestions(que_count);
    queCounter();
    clearInterval(counter);
    startTimer(15);
    clearInterval(counterLine);
    startTimerLine(0);
    next_btn.style.display="none";
}

next_btn.onclick=()=>{
    if(que_count<questions.length-1){
        que_count++;
        showQuestions(que_count);
        queCounter();
        clearInterval(counter);
        startTimer(15);
        clearInterval(counterLine);
        startTimerLine(0);
        next_btn.style.display="none";
    }
    else{
        console.log("Questions completed");
        showResultBox();
    }
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoretext=result_box.querySelector(".score_text");
    const emojis=result_box.querySelector(".icon");
    let result_desc;
    if(num_correct<=4){
        result_desc='<span>TRY AGAIN,You got only<p>'+num_correct+'</p>out of <p>'+questions.length+'</p>Correct</span>';
        emojis.innerHTML='<i class="fa-regular fa-face-frown-open"></i>';
    }
    else if(num_correct<=8){
        result_desc='<span>KEEP IT UP,You got <p>'+num_correct+'</p>out of <p>'+questions.length+'</p>Correct</span>';
        emojis.innerHTML='<i class="fa-regular fa-face-smile-beam"></i>';
    }
    else{
        result_desc='<span>CONGOS!,You got only<p>'+num_correct+'</p>out of <p>'+questions.length+'</p>Correct</span>';
        emojis.innerHTML='<i class="fa-regular fa-face-smile-wink"></i>';
    }
    scoretext.innerHTML=result_desc;
}

function showQuestions(index){
    const que_text=document.querySelector(".que_text");
    let que_tag='<span>'+questions[index].numb+". "+questions[index].question+'</span>';
    let option_tag='<div class="option">'+questions[index].options[0]+'<span></span></div>'
                  +'<div class="option">'+questions[index].options[1]+'<span></span></div>'
                  +'<div class="option">'+questions[index].options[2]+'<span></span></div>'
                  +'<div class="option">'+questions[index].options[3]+'<span></span></div>';
    que_text.innerHTML=que_tag;
    option_list.innerHTML=option_tag;
    const option=option_list.querySelectorAll(".option");
    for(let i=0;i<option.length;i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIcon='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon='<div class="icon cross"><i class="fa-solid fa-x"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns=answer.textContent;
    let allOptions=option_list.children.length;
    if(userAns==questions[que_count].answer){
        num_correct++;
       answer.classList.add("correct");
       answer.insertAdjacentHTML("beforeend",tickIcon);
    }
    else{
        answer.classList.add("wrong");
        answer.insertAdjacentHTML("beforeend",crossIcon);
        //if ans is incorrect thn automatically selected the correct answer
        for(let i=0;i<allOptions;i++){
            if(option_list.children[i].textContent==questions[que_count].answer){
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
            }
        }

    }
    for(let i=0;i<allOptions;i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display="block";
}

function queCounter(){
    const bottom_ques_counter=quiz_box.querySelector(".total_qu");
    let index=que_count+1;
    let totalQuesCountTag='<span><p>'+ index +'</p>of</p>'+questions.length+'</p>Questions</span>';
    bottom_ques_counter.innerHTML=totalQuesCountTag;
}

function startTimer(time){
    counter=setInterval(timer,1000);
    function timer(){
        timeCount.innerHTML=time;
        time--;
        if(time==-1){
            clearInterval(counter);
            let allOptions=option_list.children.length;
            for(let i=0;i<allOptions;i++){
                if(option_list.children[i].textContent==questions[que_count].answer){
                    option_list.children[i].classList.add("correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
                }
            }
            for(let i=0;i<allOptions;i++){
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display="block";
        }
    }
}

function startTimerLine(time){
    counterLine=setInterval(timer,29);
    function timer(){
        time+=1;
        timeLine.style.width=time+"px";
        if(time>555){
            clearInterval(counterLine);
        }
    }
}

