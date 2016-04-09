<?php

include_once("DB.php");
$GLOBALS['db']=new DB($host,$username,$password,$database);

class chat extends DB {
    private $todo;

    public function __construct(){
        $this->todo=$_POST['todo'];
        $this->dispatcher($this->todo);
    }

    public function dispatcher($todo){
        switch($todo){
            case "getMsgsByPage":
                $this->getMsgsByPage();
                break;
            case "sendMsg":
                $this->sendMsg();
                break;
        }
    }


    protected function getMsgsByPage(){
        if(isset($_POST['page'])){
            $pageNum=$_POST['page'];
            $pageNum=abs(intval($pageNum));
            $offset=$pageNum*10;
        }
        else{
            $offset=0;
        }
        $sql='select * from chat order by id desc limit 10 offset '.$offset;

        $result=$GLOBALS['db']->db_query($sql);
        $total=array();
        while($row = $GLOBALS['db']->db_assoc($result)){
            array_push($total, $row);
        }
        print(json_encode($total));
    }

    protected function sendMsg(){
        $msgContent=htmlspecialchars(stripslashes($_POST['msgContent']));
        $username=htmlspecialchars(stripslashes($_POST['username']));


        $sql='insert into chat values(NULL,"'.$username.'","'.$msgContent.'","'.date("Y-m-d H:i:s").'")';
//        var_dump($sql);
        $GLOBALS['db']->db_query($sql);

        $last_id=$GLOBALS['db']->db_insid();
        print (json_encode($last_id));
    }



}

$obj=new chat();