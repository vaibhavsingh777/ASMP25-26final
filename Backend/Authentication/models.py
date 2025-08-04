import uuid
from django.db import models
from Mentors.options import BRANCH_CHOICES, DEGREE_CHOICES, HOSTEL_CHOICES

class User(models.Model):
    fullname = models.CharField(max_length=100)
    ldap = models.EmailField(max_length=100, unique=True)
    roll = models.CharField(max_length=20, null=True, unique=True)
    dept = models.CharField(max_length=100, choices=BRANCH_CHOICES)
    degree = models.CharField(max_length=100, choices=DEGREE_CHOICES)
    contact = models.CharField(max_length=10)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    accessToken = models.UUIDField(default=uuid.uuid4, editable= True, unique=True)
# added field joined_at
    def __str__(self):
        return self.fullname + " " + self.ldap

    def save(self, *args, **kwargs):
        if not self.accessToken:
            self.accessToken = uuid.uuid4()
        super(User, self).save(*args, **kwargs) 

class Token(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.fullname + " " + str(self.token)
#new addition of the email field
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    linkedin = models.CharField(max_length=200, blank=True)
    sop = models.CharField(max_length=3000, blank=True)
    hostel = models.CharField(max_length=100, default="", blank=True)
    room_no = models.CharField(max_length=10, default="", blank=True)
    email = models.EmailField(max_length=100, unique=True, default="", blank=True)

    def __str__(self):
        return self.user.fullname + " " + self.user.ldap
