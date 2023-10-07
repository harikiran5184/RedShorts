from django.db import models
from django.utils import timezone
# Create your models here.
class Usersdata(models.Model):
    username = models.CharField(max_length=225, primary_key=True)
    phonenumber = models.CharField(max_length=11)
    password = models.CharField(max_length=225)

    def __str__(self):
        return str({"name": self.username, "password": self.password})
class Videos(models.Model):
    username = models.CharField(max_length=225)
    video=models.CharField(max_length=500,default="")
    time = models.DateTimeField(default=timezone.now)
    def __str__(self):
        return str({"name":self.username,"video":self.video,"time":self.time})
class Likes(models.Model):
    susername=models.CharField(max_length=225)
    rusername=models.CharField(max_length=225)
    video=models.CharField(max_length=500)
    def __str__(self):
        return str({"susername":self.susername,"rusername":self.rusername,"video":self.video})
class Keys(models.Model):
    why=models.CharField(max_length=225)
    key=models.CharField(max_length=225)
    def __str__(self):
        return str({"why":self.why,"key":self.key})