let numbers = [];
let iterations = [];
let currentIteration=0;

function startSorting() {
  const input = document.getElementById("numbers").value;
  numbers=input.split(',').map(num=>parseInt(num.trim()));
  console.log(numbers);
  const algo=document.getElementById("algorithm").value;;
  console.log(algo);
  switch (algo) {
      case 'bubble':
        console.log("inside switch - bubble");
        iterations = bubbleSort(numbers);
        console.log(iterations);
        break;
      case 'merge':
        iterations = mergeSort(numbers);
        break;
      case 'insertion':
        iterations = insertionSort(numbers);
        break;
      case 'selection':
        iterations = selectionSort(numbers);
        break;
      default:
        break;
    }
  displayIteration(0);
}

function displayIteration(iterationIndex) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `Iteration ${iterationIndex + 1}: ${iterations[iterationIndex].join(', ')}`;
}

function nextIteration() {
  // Increment the current iteration index and check if it's within bounds
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('previous');
  currentIteration++;
  if (currentIteration+1 >= iterations.length) {
    //document.getElementById('next').innerText = 'Stop';
    nextButton.disabled = true;
    nextButton.style.display = 'none';
  }
  if (currentIteration>0 && prevButton.disabled){
    prevButton.disabled = false;
    prevButton.style.display = 'block';
  }
 displayIteration(currentIteration);
}

function previousIteration() {
  // Decrement the current iteration index and check if it's within bounds
  const prevButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  currentIteration--;
  if (currentIteration < 1) {
    //document.getElementById('previous').innerText = 'Next';
    prevButton.disabled = true;
    prevButton.style.display = 'none';
  }
  if (currentIteration < iterations.length && nextButton.disabled){
    nextButton.disabled = false;
    nextButton.style.display = 'block';
  }

  // Display the numbers at the previous iteration
  displayIteration(currentIteration);
}

document.getElementById('start').addEventListener('click', startSorting);
document.getElementById('next').addEventListener('click', nextIteration);
document.getElementById('previous').addEventListener('click', previousIteration);
document.getElementById('stop').addEventListener('click', function() {
  window.location.reload(); // Reload the page to start over
});

function bubbleSort(arr) {
  const iterations = [];
  const n = arr.length;
  if (n==1)
    return [arr]
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements if they are in the wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      // Store the intermediate state of the array at this iteration
      iterations.push([...arr]);
    }
  }

  return iterations;
}

function mergeSort(arr) {
  const iterations = [];
  const n = arr.length;
  if (n==1)
    return [arr]

  // Merge two sorted subarrays
  function merge(left, right) {
    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        merged.push(left[leftIndex]);
        leftIndex++;
      } else {
        merged.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  // Recursive function to divide and merge
  function mergeSortRecursive(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedLeft = mergeSortRecursive(left);
    const sortedRight = mergeSortRecursive(right);

    const merged = merge(sortedLeft, sortedRight);

    // Store the intermediate state of the array at this iteration
    iterations.push([...merged]);

    return merged;
  }

  // Start the merge sort process
  mergeSortRecursive(arr);

  return iterations;
}

function insertionSort(arr) {
  const iterations = [];
  const n = arr.length;
  if (n==1)
    return [arr]

  for (let i = 1; i < arr.length; i++) {
    const currentElement = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > currentElement) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = currentElement;

    // Store the intermediate state of the array at this iteration
    iterations.push([...arr]);
  }

  return iterations;
}

function selectionSort(arr) {
  const iterations = [];
  const n = arr.length;
  if (n==1)
    return [arr]

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      // Swap elements if needed
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }

    // Store the intermediate state of the array at this iteration
    iterations.push([...arr]);
  }

  return iterations;
}
