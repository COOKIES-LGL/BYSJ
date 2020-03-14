from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def rankList(request):
    formula = request.GET['formula']
    try:
        result = eval(formula, {})
    except:
        result = 'Error formula'
    return HttpResponse(result)
