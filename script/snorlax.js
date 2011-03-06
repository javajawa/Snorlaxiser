var syllableCount = function(string) {
  var matches = string.match(syllableCount.pattern);
  if (matches == null) return 0;
  
  var currentSyllableCount = matches.length;
  
  if (string.match(syllableCount.silentE) != null) currentSyllableCount -= string.match(syllableCount.silentEs).length;
  
  return currentSyllableCount;
}
syllableCount.pattern  = new RegExp("[aeiouy]([^aieouy]|$)", 'gim');
syllableCount.silentE  = new RegExp("[aeiouy][^aeiouy]e([^a-z]|s|$)", 'i');
syllableCount.silentEs = new RegExp("[aeiouy][^aeiouy]e([^a-z]|s|$)", 'gim');

function convertText(str) {
  var words = str.match(convertText.splitIntoWords);
  if (words == null) return str;
  
  var word_count = words.length; var out = '';
  
  for (var i = 0; i < words.length; i++) {
    var syllCount = syllableCount(words[i]);
    
    if (words[i].match(convertText.startsWithUpper) == null) {
      out += convertText.syllables[Math.floor(Math.random()*convertText.syllables.length)];
    } else {
      out += convertText.upperSyllables[Math.floor(Math.random()*convertText.upperSyllables.length)];
    }
    
    for (var j = 1; j < syllCount; j++) {
      out += convertText.syllables[Math.floor(Math.random()*convertText.syllables.length)];
    }
    
    trailing_punctuation = words[i].match(convertText.trailingPunctuation);
    if (trailing_punctuation != null) out += trailing_punctuation;
  }
  
  return out;
}
convertText.splitIntoWords = new RegExp("[a-z\']+([^a-z\']+|$)", 'gim');
convertText.trailingPunctuation = new RegExp("[^a-z']+$", 'i');
convertText.startsWithUpper = new RegExp("^[A-Z]", '');

convertText.syllables = new Array (
  'snor',
  'lax'
);

convertText.upperSyllables = new Array (
  'Snor',
  'Lax'
);

function convertNodes(node) {
  if (node.nodeType == 3) { // 3 is a Text Node
    node.nodeValue = convertText(node.nodeValue);
  } else {
    var m = node.childNodes.length;
    for (var i = 0; i < m; i ++) convertNodes(node.childNodes[i]);
  }
}

