export default function sort(arr, low, high, key) {
    quicksort(arr, low,high);

    function quicksort(arr, low, high) {
        if(high <= low) return;

        let i = partition(arr, low, high, isNaN(Number(arr[low])));
        
        quicksort(arr, low, i - 1);
        quicksort(arr, i + 1, high);
    }
    
    function partition(arr, low, high, noNum){
        const pivot = low;
        let i = low + 1, j = high;

        while(true){
            if(noNum){
                while(arr[i][key] < arr[pivot][key] && i < high) i++;
                while(arr[j][key] >= arr[pivot][key] && j > low) j--;
            }
            else {
                while(Number(arr[i][key]) < Number(arr[pivot][key]) && i < high) i++;
                while(Number(arr[j][key]) >= Number(arr[pivot][key]) && j > low) j--;
            }
                
            if(i >= j){
                break;
            }
    
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    
        [arr[j], arr[pivot]] = [arr[pivot], arr[j]]
    
        return j;
    }

};