let hours=0,minutes=0,seconds=0;
function updateTime()
{    
    seconds++;
    if(seconds>=60)
        {
            seconds=0;
            minutes++;
            if(minutes>=60)
                {
                    minutes=0;
                    hours++;
                    {
                        if(hours>=24)
                            hours=0;
                    }

                }
        }
}
function display()
{   
    console.log(hours.toString().padStart(2,"0")+":"+  
    minutes.toString().padStart(2,"0")+":"+
    seconds.toString().padStart(2,"0")
)
}
setInterval(()=>{updateTime();
    display();
},1000);