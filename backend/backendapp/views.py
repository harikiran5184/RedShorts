from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.views.decorators.csrf import csrf_exempt
import json
import random
# Create your views here.
from django.http import JsonResponse
@csrf_exempt
def login(request):
    if request.method=="POST":
        body=request.body
        print(body)
        data=json.loads(body)
        uname=data.get('username')
        upassword=data.get('password')
        users = Usersdata.objects.filter(username=uname , password=upassword)

        user_list = [
            {"name": user.username, "password": user.password}
            for user in users
        ]
        if users.exists():
            response = {"username":uname}
        else:
            response = {"username":"No Login"}
        return JsonResponse(response)
@csrf_exempt
def signup(request):
    if request.method=="POST":
        body=request.body
        data=json.loads(body)
        sname=data.get('username')
        sphone=data.get('phone')
        spassword=data.get('password')
        check=Usersdata.objects.filter(username=sname)
        pcheck=Usersdata.objects.filter(phonenumber=sphone)
        if check.exists():
            return HttpResponse("Username Already Exists")    
        else:
            if pcheck.exists():
                return HttpResponse("PhoneNumber is Already Exists")
            users=Usersdata(username=sname,phonenumber=sphone,password=spassword)
            users.save()
            return HttpResponse("signup success")
def video(request):
    vi=Videos.objects.all()
    vide=[
        {"name":i.username,"video":i.video,"time":i.time}
        for i in vi
    ]
    random.shuffle(vide)
    return JsonResponse(vide,safe=False)
import os
import shutil

from django.conf import settings
from django.http import JsonResponse
from django.conf import settings

@csrf_exempt
def upload_file(request):
    if request.method == 'POST' and request.FILES.get('file'):
        data = request.POST.get('username')
        print(data)
        check=Videos.objects.filter(username=data)
        che=[
            {"name":i.username}
            for i in check
        ]
        f=len(che)
        file = request.FILES['file']
        file_path = os.path.join(settings.MEDIA_ROOT, file.name)

        with open(file_path, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        new_file_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'src', 'videos', data+"{"+str(f)+".mp4")
        shutil.move(file_path, new_file_path)
        vid=Videos(username=data,video=data+"{"+str(f)+".mp4")
        vid.save()
        return JsonResponse({'message': 'File uploaded successfully.'})

    return JsonResponse({'message': 'Invalid request.'}, status=400)
@csrf_exempt
def addlikes(request):
    if request.method=='POST':
        data=request.body
        data=json.loads(data)
        print(data.get('susername'))
        like=Likes.objects.filter(susername=data.get('susername'),rusername=data.get('rusername'),video=data.get('video'))
        if(like.exists()):
            return HttpResponse("already liked")
        else:
            addlike=Likes(susername=data.get('susername'),rusername=data.get('rusername'),video=data.get('video'))
            addlike.save()
            return HttpResponse("liked")
@csrf_exempt
def checklikes(request):
    if request.method=='POST':
        data=request.body
        data=json.loads(data)
        print(data)
        likecheck="not liked"
        like=Likes.objects.filter(susername=data.get('susername'),rusername=data.get('rusername'),video=data.get('video'))
        count=Likes.objects.filter(video=data.get('video'))
        if(len(like)>0):
            likecheck="liked"
            return JsonResponse({"likestatus":"liked","count":len(count)})
        print(likecheck,len(count))
        return JsonResponse({"likestatus":likecheck,"count":len(count)})
def keys(request):
    ke=Keys.objects.all()
    print(len(ke))
    akey=[
        {'key':i.key,'video':i.why}
        for i in ke
    ]
    print(akey)
    return JsonResponse(akey,safe=False)
@csrf_exempt
def yourvideos(request):
    if request.method=='POST':
        data=request.body
        data=json.loads(data)
        print(data.get('data'))
        vi=Videos.objects.filter(username=data.get('data'))
        vide=[
            {"video":i.video}
            for i in vi
        ]
        print(vide)
        return JsonResponse(vide,safe=False)

@csrf_exempt
def settings(request):
    if request.method=='POST':
        data=request.body
        data=json.loads(data)
        print(data)
        if(data.get('status')==1):
            udata=Usersdata(username=data.get('data'),password=data.get('password'))
            udata.save()
        udata=Usersdata.objects.filter(username=data.get('data'))
        usdata=[
            {"name":i.username,"password":i.password}
            for i in udata
        ]
        return JsonResponse(usdata,safe=False)