import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Order "mo:base/Order";

actor {
  type Post = {
    id: Nat;
    title: Text;
    body: Text;
    author: Text;
    timestamp: Time.Time;
  };

  stable var postIdCounter: Nat = 0;
  stable var postEntries: [(Nat, Post)] = [];

  func sortPosts(a: Post, b: Post): Order.Order {
    if (a.timestamp > b.timestamp) { #less }
    else if (a.timestamp < b.timestamp) { #greater }
    else { #equal }
  };

  public query func getPosts(): async [Post] {
    let posts = Buffer.fromArray<Post>(Array.map<(Nat, Post), Post>(postEntries, func(entry) { entry.1 }));
    let postsArray = Buffer.toArray(posts);
    Array.sort(postsArray, sortPosts)
  };

  public func createPost(title: Text, body: Text, author: Text): async Nat {
    postIdCounter += 1;
    let post: Post = {
      id = postIdCounter;
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    postEntries := Array.append(postEntries, [(postIdCounter, post)]);
    postIdCounter
  };

  system func preupgrade() {
    // No need to do anything, as we're using stable variables
  };

  system func postupgrade() {
    // No need to do anything, as we're using stable variables
  };
}
