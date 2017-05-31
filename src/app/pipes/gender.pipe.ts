import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'gender'
})
export class GenderPipe implements PipeTransform {
    transform(value, args?) {
    	console.log("value, args", value, args);
    	if(value == 1) {
    		return "Male";
    	}else if(value == 2){
    		return "Female";
    	}
        return "NaN"
    }
}