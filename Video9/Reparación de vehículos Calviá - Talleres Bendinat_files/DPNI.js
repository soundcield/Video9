function ybFun_CustomFindAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        return;
    }

    var targetNum = searchText.toString();
    var provisionNum = replacement.toString();
    var delims = new Array();
    delims[0] = "";
    delims[1] = "-";
    delims[2] = ".";
    delims[3] = "\\s";
    for (var i = 0; i < delims.length; i++) {
        var delimToUse = (("." == delims[i]) ? "\\" : "") + delims[i];
        var delimToReplace = delims[i];
        if (delimToReplace == "") {
            delimToReplace = "-";
        }
        if (delimToReplace == "\\s") {
            delimToReplace = " ";
        }
        var newTargetNum = targetNum.substring(0, 3) + delimToUse + targetNum.substring(3, 6) + delimToUse + targetNum.substring(6, 10);
        var newProvisionNum = "";
        if (provisionNum.length > 0) {
            newProvisionNum = provisionNum.substring(0, 3) + delimToReplace + provisionNum.substring(3, 6)+ delimToReplace + provisionNum.substring(6, 10);
        }

        ybFun_GenericFindAndReplace(newTargetNum, newProvisionNum);
    }
    var newTargetNum = '\\(' + targetNum.substring(0, 3) + '\\)\\s{0,}' + targetNum.substring(3, 6) + '-{0,1}\\.{0,1}\\s{0,}' + targetNum.substring(6, 10);
    var newProvisionNum = "";
    if (provisionNum.length > 0) {
        newProvisionNum = '(' + provisionNum.substring(0, 3) + ') ' + provisionNum.substring(3, 6) + '-' + provisionNum.substring(6, 10);
    }
    ybFun_GenericFindAndReplace(newTargetNum, newProvisionNum);
}

function ybFun_GenericFindAndReplace(searchText, replacement, searchNode) {
    var regex = typeof searchText === 'string' ? new RegExp(searchText, 'g') : searchText;
    var bodyObj = document.body;
    var content = bodyObj.innerHTML;
    if (regex.test(content)) {	
        content = content.replace(regex, replacement);
        bodyObj.innerHTML = unescape(content);
    }
}


var useYF=[];
var ybFindPhNums = [];
var ybReplacePhNums = [];

function ybFun_ReplaceText() {
   if (ybFindPhNums == null || ybReplacePhNums == null || ybFindPhNums.length == 0 || 	ybReplacePhNums.length == 0
                || ybFindPhNums.length != ybReplacePhNums.length) {
            return;
        }


    if (useYF == null || useYF.length <= 0) {
          for (var i = 0; i < ybFindPhNums.length; i++) {
                ybFun_CustomFindAndReplace(ybFindPhNums[i], ybReplacePhNums[i]);
            }
	}else
	{
	    var replaced = null;
            var idxs = useYF.split(',');
            for (var i = 0; i < idxs.length; i++) {
                if (ybFun_IsDigit(idxs[i])) {
                    ybFun_CustomFindAndReplace(ybFindPhNums[(idxs[i] - 1)], ybReplacePhNums[(idxs[i] -1)]);
		   replaced= "true"; 

		}
            
            }
	    if(replaced == null)
	     {
		for (var i = 0; i < ybFindPhNums.length; i++) {
                	ybFun_CustomFindAndReplace(ybFindPhNums[i], ybReplacePhNums[i]);
            	}
	    }
        }
    
}

function ybFun_IsDigit(strVal) {
    var reg = new RegExp(/^\d+$/);
    return (reg.test(strVal));
}


